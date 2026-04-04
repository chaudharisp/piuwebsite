// GitHub API-based file saving with automatic commit for Azure Static Web Apps
module.exports = async function (context, req) {
    // Check authentication
    const clientPrincipal = req.headers['x-ms-client-principal'];
    if (!clientPrincipal) {
        context.res = {
            status: 401,
            body: { error: 'Authentication required' }
        };
        return;
    }

    if (req.method !== 'POST') {
        context.res = {
            status: 405,
            body: { error: 'Method not allowed' }
        };
        return;
    }

    const { filename, content, title, isNew, sha } = req.body;
    
    if (!filename || content === undefined) {
        context.res = {
            status: 400,
            body: { error: 'Filename and content are required' }
        };
        return;
    }

    try {
        // Security: Only allow certain file types and paths
        const allowedExtensions = ['.html', '.yml', '.yaml', '.md'];
        const allowedPaths = ['', '_data/', 'blog/'];
        
        const ext = filename.substring(filename.lastIndexOf('.'));
        const dir = filename.includes('/') ? filename.substring(0, filename.lastIndexOf('/') + 1) : '';
        
        if (!allowedExtensions.includes(ext) || !allowedPaths.includes(dir)) {
            context.res = {
                status: 403,
                body: { error: 'File type or path not allowed' }
            };
            return;
        }

        let finalContent = content;
        
        // For HTML files, wrap content with basic template if it's not already complete
        if (ext === '.html' && !content.includes('<!DOCTYPE html>')) {
            finalContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title || 'New Page'}</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
${content}
</body>
</html>`;
        } else if (ext === '.html' && title) {
            // Update title in existing HTML
            finalContent = content.replace(/<title>.*?<\/title>/i, `<title>${title}</title>`);
        }

        // Get user info
        let user = { userDetails: 'Anonymous' };
        try {
            if (clientPrincipal) {
                user = JSON.parse(Buffer.from(clientPrincipal, 'base64').toString());
            }
        } catch (e) {
            context.log('Could not parse user info');
        }

        // Commit to GitHub using GitHub API
        const githubToken = process.env.GITHUB_TOKEN || '';
        const repo = 'krnch/piuwebsite';
        
        const commitData = {
            message: `Update ${filename} via admin interface by ${user.userDetails}`,
            content: Buffer.from(finalContent).toString('base64'),
            branch: 'main'
        };

        // If updating existing file, include SHA
        if (sha) {
            commitData.sha = sha;
        }

        const githubUrl = `https://api.github.com/repos/${repo}/contents/${filename}`;
        
        const response = await fetch(githubUrl, {
            method: 'PUT',
            headers: {
                'Authorization': githubToken ? `token ${githubToken}` : '',
                'Accept': 'application/vnd.github.v3+json',
                'Content-Type': 'application/json',
                'User-Agent': 'Portfolio-Admin'
            },
            body: JSON.stringify(commitData)
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(`GitHub API error: ${response.status} - ${errorData.message || 'Unknown error'}`);
        }

        const result = await response.json();
        
        context.log(`File ${isNew ? 'created' : 'updated'}: ${filename} by ${user.userDetails}`);

        context.res = {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            },
            body: {
                success: true,
                message: `File ${isNew ? 'created' : 'saved'} successfully and committed to GitHub!`,
                filename: filename,
                commitUrl: result.commit?.html_url || '',
                sha: result.content?.sha || ''
            }
        };

    } catch (error) {
        context.log.error('Error saving file:', error);
        context.res = {
            status: 500,
            body: { error: 'Failed to save file: ' + error.message }
        };
    }
};