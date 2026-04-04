const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8000;

const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif',
    '.ico': 'image/x-icon',
    '.svg': 'image/svg+xml',
    '.yml': 'text/yaml',
    '.yaml': 'text/yaml'
};

const server = http.createServer((req, res) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    
    // Remove query parameters for file path
    let filePath = req.url.split('?')[0];
    
    // Default to index.html
    if (filePath === '/') {
        filePath = '/index.html';
    }
    
    // Handle admin routes without .html extension
    if (filePath.startsWith('admin/') && !filePath.includes('.')) {
        filePath = filePath + '.html';
    }
    
    // Remove leading slash
    filePath = filePath.substring(1);
    
    // Security: prevent directory traversal
    if (filePath.includes('..')) {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('Bad Request');
        return;
    }
    
    const fullPath = path.join(__dirname, filePath);
    
    // Check if file exists
    fs.access(fullPath, fs.constants.F_OK, (err) => {
        if (err) {
            // File not found
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end(`
                <html>
                    <head><title>404 - Not Found</title></head>
                    <body>
                        <h1>404 - File Not Found</h1>
                        <p>The file <strong>${filePath}</strong> was not found.</p>
                        <p><a href="/admin/">← Go to Admin</a></p>
                    </body>
                </html>
            `);
            return;
        }
        
        // Get file extension for MIME type
        const ext = path.extname(fullPath).toLowerCase();
        const mimeType = mimeTypes[ext] || 'application/octet-stream';
        
        // Set CORS headers for admin functionality
        const headers = {
            'Content-Type': mimeType,
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
        };
        
        // Handle OPTIONS requests (CORS preflight)
        if (req.method === 'OPTIONS') {
            res.writeHead(200, headers);
            res.end();
            return;
        }
        
        // Read and serve file
        fs.readFile(fullPath, (err, data) => {
            if (err) {
                console.error(`Error reading file ${fullPath}:`, err);
                res.writeHead(500, { 'Content-Type': 'text/html' });
                res.end(`
                    <html>
                        <head><title>500 - Server Error</title></head>
                        <body>
                            <h1>500 - Internal Server Error</h1>
                            <p>Error reading file: <strong>${filePath}</strong></p>
                            <p>Full path: <strong>${fullPath}</strong></p>
                            <p>Error: <strong>${err.message}</strong></p>
                            <p><a href="/admin/">← Go to Admin</a></p>
                        </body>
                    </html>
                `);
                return;
            }
            
            res.writeHead(200, headers);
            res.end(data);
        });
    });
});

server.listen(PORT, () => {
    console.log(`🚀 Local server running at http://localhost:${PORT}`);
    console.log(`📝 Admin interface: http://localhost:${PORT}/admin/`);
    console.log(`🖥️  Local editor: http://localhost:${PORT}/admin/editor-local`);
    console.log(`📖 Methods guide: http://localhost:${PORT}/admin/editing-methods-guide`);
    console.log(`Press Ctrl+C to stop`);
});

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('\n👋 Shutting down server...');
    server.close(() => {
        console.log('Server stopped.');
        process.exit(0);
    });
});