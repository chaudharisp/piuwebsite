module.exports = async function (context, req) {
    context.log('Netlify CMS Auth API called');

    const corsHeaders = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With'
    };

    // Handle CORS preflight
    if (req.method === 'OPTIONS') {
        context.res = {
            status: 200,
            headers: corsHeaders
        };
        return;
    }

    try {
        const { code, state } = req.query;
        
        // If no code, redirect to GitHub OAuth
        if (!code) {
            const clientId = process.env.GITHUB_CLIENT_ID;
            const baseUrl = process.env.SITE_URL || 'https://red-plant-033de6c1e.2.azurestaticapps.net';
            const redirectUri = `${baseUrl.replace(/\/$/, '')}/api/auth`;
            const scope = 'repo,user';
            
            const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${scope}&state=${state || 'cms'}`;
            
            context.res = {
                status: 302,
                headers: {
                    ...corsHeaders,
                    'Location': githubAuthUrl
                }
            };
            return;
        }

        // Exchange code for token
        const clientId = process.env.GITHUB_CLIENT_ID;
        const clientSecret = process.env.GITHUB_CLIENT_SECRET;
        
        const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                client_id: clientId,
                client_secret: clientSecret,
                code: code
            })
        });

        const tokenData = await tokenResponse.json();
        
        if (tokenData.access_token) {
            // For Netlify CMS popup flow, return HTML that posts message to parent
            context.log('OAuth success, returning popup callback HTML');
            
            const callbackHtml = `
<!DOCTYPE html>
<html>
<head>
    <title>Authorization Complete</title>
</head>
<body>
    <h1>Authorization Complete</h1>
    <p>You can close this window.</p>
    <script>
        // Post message to parent window (Netlify CMS)
        const data = {
            token: "${tokenData.access_token}",
            provider: "github"
        };
        
        // Modern Decap CMS callback format
        if (window.opener) {
            // Decap CMS expects this specific message format
            window.opener.postMessage(
                "authorization:github:success:" + JSON.stringify({
                    token: "${tokenData.access_token}",
                    provider: "github"
                }),
                "*"
            );
            window.close();
        } else {
            // Fallback for debugging
            document.body.innerHTML = '<h2>Authorization Complete!</h2><p>Token: ${tokenData.access_token}</p><p>You can close this window.</p>';
        }
    </script>
</body>
</html>`;
            
            context.res = {
                status: 200,
                headers: {
                    ...corsHeaders,
                    'Content-Type': 'text/html'
                },
                body: callbackHtml
            };
        } else {
            context.log('Token exchange failed:', tokenData);
            throw new Error('Failed to get access token: ' + JSON.stringify(tokenData));
        }

    } catch (error) {
        context.log.error('Auth error:', error);
        context.res = {
            status: 500,
            headers: corsHeaders,
            body: { error: "Authentication failed" }
        };
    }
};