module.exports = async function (context, req) {
    context.res = {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        body: {
            message: "API is working!",
            timestamp: new Date().toISOString(),
            url: req.url,
            method: req.method
        }
    };
};