const Koa = require('koa')
const axios = require('axios')
const cors = require('koa2-cors')
const bodyParser = require('koa-bodyparser')
const app = new Koa()
const router = require('./router/index')

// 跨域配置
// app.use(cors())
app.use(
    cors({
        origin: '*'
    })
)

// POST请求处理
app.use(bodyParser())

// 添加响应拦截器
axios.interceptors.response.use(
    function (response) {
        return response.data
    },
    function (error) {
        return Promise.reject(error)
    }
)

// 调用路由中间件
app.use(router.routes())

// 配置端口
const port = process.env.PORT || 3000

// 启动服务
app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})
