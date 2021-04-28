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
      app.get('/seller', function (_req, res) {
        res.json({
          errno: 0,
          data: seller
        })
      })
      app.get('/category', function (_req, res) {
        res.json({
          errno: 0,
          data: goods
        })
      })
      app.get('/ratings', function (_req, res) {
        res.json({
          errno: 0,
          data: ratings
        })
      })
      app.post('/user/login', function (_req, res) {
        res.json({
          errno: 0,
          data: {
            token: 'a.b.c',
            loginUser: {
              username: 'jack'
            }
          }
        })
      })
      app.post('/user', function (_req, res) {
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
