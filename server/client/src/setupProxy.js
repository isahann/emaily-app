const proxy = require('http-proxy-middleware');
const routes = ['/api', '/auth/google'];

module.exports = function(app) {
  app.use(proxy(routes, { target: 'http://localhost:5000' }));
};
