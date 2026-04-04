// GitHub API-based file retrieval for Azure Static Web Apps
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

    // Support both query parameter and POST body
    const file = req.query.file || (req.body && req.body.filename);
    
    if (!file) {
        context.res = {
            status: 400,
            body: { error: 'File parameter required (use ?file= or POST with filename)' }
        };
        return;
    }

    try {
        // Security: Only allow certain file types and paths
        const allowedExtensions = ['.html', '.yml', '.yaml', '.md'];
        const allowedPaths = ['', '_data/', 'blog/'];
        
        const ext = file.substring(file.lastIndexOf('.'));
        const dir = file.includes('/') ? file.substring(0, file.lastIndexOf('/') + 1) : '';
        
        if (!allowedExtensions.includes(ext) || !allowedPaths.includes(dir)) {
            context.res = {
                status: 403,
                body: { error: 'File type or path not allowed' }
            };
            return;
        }

        // Use GitHub API to get file content
        const githubToken = process.env.GITHUB_TOKEN || '';
        const repo = 'krnch/piuwebsite';
        
        const githubUrl = `https://api.github.com/repos/${repo}/contents/${file}`;
        
        const response = await fetch(githubUrl, {
            headers: {
                'Authorization': githubToken ? `token ${githubToken}` : '',
                'Accept': 'application/vnd.github.v3+json',
                'User-Agent': 'Portfolio-Admin'
            }
        });

        let content = '';
        let title = '';
        let sha = '';

        if (response.ok) {
            const data = await response.json();
            content = Buffer.from(data.content, 'base64').toString('utf8');
            sha = data.sha;
            
            // Extract title from HTML files
            if (ext === '.html') {
                const titleMatch = content.match(/<title>(.*?)<\/title>/i);
                title = titleMatch ? titleMatch[1] : '';
            }
        } else if (response.status === 404) {
            // File doesn't exist - return empty content
            content = '';
            title = '';
        } else {
            throw new Error(`GitHub API error: ${response.status}`);
        }

        context.res = {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            },
            body: {
                filename: file,
                content: content,
                title: title,
                sha: sha
            }
        };

    } catch (error) {
        context.log.error('Error reading file:', error);
        context.res = {
            status: 500,
            body: { error: 'Failed to read file: ' + error.message }
        };
    }
};