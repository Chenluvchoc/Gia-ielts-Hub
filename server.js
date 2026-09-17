// 雅思备考与语料工作台 - Node HTTP 服务器
// 静态文件 + /api/chat 代理（解决浏览器直连 API 的网络问题）
// 仅使用 Node 内置模块，无需安装依赖
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const ROOT = __dirname;

const MIME = {
    '.html': 'text/html; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.webmanifest': 'application/manifest+json',
};

function serveStatic(req, res) {
    let urlPath = decodeURIComponent(req.url.split('?')[0]);
    if (urlPath === '/') urlPath = '/index.html';
    // 防目录穿越
    const filePath = path.join(ROOT, path.normalize(urlPath).replace(/^(\.\.[\/\\])+/, ''));
    if (!filePath.startsWith(ROOT)) { res.writeHead(403); res.end('Forbidden'); return; }
    fs.readFile(filePath, (err, data) => {
        if (err) { res.writeHead(404); res.end('Not Found'); return; }
        const ext = path.extname(filePath).toLowerCase();
        res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream', 'Cache-Control': 'no-cache' });
        res.end(data);
    });
}

async function handleProxy(req, res) {
    let body = '';
    req.on('data', c => { body += c; });
    req.on('end', async () => {
        try {
            const { api_url, api_key, body: reqBody } = JSON.parse(body || '{}');
            if (!api_url || !api_key || !reqBody) {
                res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
                res.end(JSON.stringify({ error: '缺少必要参数: api_url, api_key, body' }));
                return;
            }
            let url = api_url.replace(/\/+$/, '');
            if (!/\/v\d+$/.test(url)) url += '/v1';
            const fullUrl = url + '/chat/completions';

            const apiRes = await fetch(fullUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${api_key}` },
                body: JSON.stringify(reqBody),
                signal: AbortSignal.timeout(30000),
            });
            const data = await apiRes.text();
            res.writeHead(apiRes.status, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(data);
        } catch (err) {
            console.error('Proxy error:', err.message);
            res.writeHead(502, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify({ error: `代理请求失败: ${err.message}` }));
        }
    });
}

const server = http.createServer((req, res) => {
    if (req.method === 'POST' && req.url.split('?')[0] === '/api/chat') {
        handleProxy(req, res);
    } else {
        serveStatic(req, res);
    }
});

server.listen(PORT, '0.0.0.0', () => {
    console.log(`IELTS Hub server running on port ${PORT}`);
});
