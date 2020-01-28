const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(proxy('/login', { target: 'http://localhost:3005/'}))
  app.use(proxy('/admin', { target: 'http://localhost:3005/'}))
  app.use(proxy('/oauth', { target: 'http://localhost:3005/'}))
  app.use(proxy('/chat', { target: 'http://localhost:3004/', pathRewrite: {'/chat' : '/socket.io'}, ws: true, changeOrigin: true }))
}
