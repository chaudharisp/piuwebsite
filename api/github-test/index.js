module.exports = async function (context, req) {
    const corsHeaders = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    };

    if (req.method === 'OPTIONS') {
        context.res = { status: 200, headers: corsHeaders };
        return;
    }

    try {
        // Get token from query parameters (for testing)
        const { token } = req.query;
        
        if (!token) {
            context.res = {
                status: 400,
                headers: corsHeaders,
                body: { error: 'Token required. Use: /api/github-test?token=YOUR_TOKEN' }
            };
            return;
        }

        // Test GitHub API access with the token
        const response = await fetch('https://api.github.com/user/repos', {
            headers: {
                'Authorization': `token ${token}`,
                'User-Agent': 'Portfolio-CMS'
            }
        });

        const repos = await response.json();
        
        // Look specifically for your portfolio repo
        const portfolioRepo = repos.find(repo => repo.name === 'piuwebsite');
        
        context.res = {
            status: 200,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            body: {
                success: response.ok,
                status: response.status,
                portfolioRepoFound: !!portfolioRepo,
                portfolioRepoPermissions: portfolioRepo ? {
                    canPush: portfolioRepo.permissions?.push || false,
                    canPull: portfolioRepo.permissions?.pull || false,
                    isPrivate: portfolioRepo.private
                } : null,
                totalRepos: repos.length || 0,
                error: response.ok ? null : repos.message
            }
        };

    } catch (error) {
        context.res = {
            status: 500,
            headers: corsHeaders,
            body: { error: error.message }
        };
    }
};