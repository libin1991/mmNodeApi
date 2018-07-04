const koa = require('koa')
const app = new koa()
const apicache = require("apicache");
const cache = apicache.middleware;
const axios = require('axios')
const router = require('./router/index')

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    return response.data;
}, function (error) {
    return Promise.reject(error);
})

// 路由缓存
// const onlyStatus200 = (req, res) => res.statusCode === 200;
// app.use(cache("2 minutes", onlyStatus200));

// 调用路由中间件
app.use(router.routes())

// 配置端口
const port = process.env.PORT || 3000

// 启动服务
app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})
