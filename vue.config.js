const { seller, goods, ratings } = require('./data.json')

module.exports = {
  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        import: ['./src/theme']
      }
    }
  },
  pluginOptions: {
    'cube-ui': {
      postCompile: true,
      theme: true
    }
  },
  devServer: {
    before(app) {
      app.get('/api/seller', function (_req, res) {
        res.json({
          errno: 0,
          data: seller
        })
      })
      app.get('/api/goods', function (_req, res) {
        res.json({
          errno: 0,
          data: goods
        })
      })
      app.get('/api/ratings', function (_req, res) {
        res.json({
          errno: 0,
          data: ratings
        })
      })
      app.post('/api/in', function (_req, res) {
        res.json({
          errno: 0,
          data: {
            token: 'a.b.c'
          }
        })
      })
      app.post('/api/user', function (_req, res) {
        res.json({
          errno: 0,
          data: {
            username: 'Jack'
          }
        })
      })
    }
  }
}
