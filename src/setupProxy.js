const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://kannada-koota-tickets.vercel.app',
      changeOrigin: true,
    })
  );
};