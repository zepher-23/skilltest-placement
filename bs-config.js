module.exports = {
     proxy: 'http://localhost:3000',
  files: ['public/**/*.{css,js}', 'views/**/*.ejs'],
  ignore: ['node_modules'],
  reloadDelay: 100,
  ui: false,
  notify: false,
  port: 4000
}