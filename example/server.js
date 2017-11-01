const KOA = require('koa')
const { vueSSR, ssrRouter } = require('../index')

const config = {}

const app = new KOA()

app.use(ssrRouter(config))

app.listen(8081)