const PROXY_CONFIG = [
  {
    context: ['/api'],
    target: 'http://localhost:8000/',
    secure: false, //* true if you use https:// */
    logLevel: 'debug',
    pathRewrite: { '^/api' : ''}
  }
];

module.exports = PROXY_CONFIG;
