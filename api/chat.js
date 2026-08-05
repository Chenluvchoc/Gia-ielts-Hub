// Vercel Serverless Function: API Proxy
// 解决浏览器直连 API 时的 DNS/CORS/网络问题
// 浏览器 → Vercel 代理 → API 服务器

export default async function handler(req, res) {
    // 只允许 POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const { api_url, api_key, body } = req.body;

        if (!api_url || !api_key || !body) {
            return res.status(400).json({ error: '缺少必要参数: api_url, api_key, body' });
        }

        // 构造完整 URL（自动补 /v1）
        let url = api_url.replace(/\/+$/, '');
        if (!url.match(/\/v\d+$/)) url += '/v1';
        const fullUrl = url + '/chat/completions';

        // 转发请求到 API 服务器
        const apiRes = await fetch(fullUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${api_key}`,
            },
            body: JSON.stringify(body),
            signal: AbortSignal.timeout(55000),
        });

        // 获取 API 响应
        const data = await apiRes.text();

        // 返回给浏览器
        res.status(apiRes.status);
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        res.send(data);
    } catch (err) {
        console.error('Proxy error:', err.message);
        res.status(502).json({
            error: `代理请求失败: ${err.message}`,
            hint: 'Vercel 服务器无法连接到 API 地址，请检查 API 地址是否正确或稍后重试',
        });
    }
}
