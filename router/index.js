const router = require('koa-router')()

// banner
router.get('/banner', require('./banner/banner'))

//排行榜
router.get('/toplist', require('./toplist/toplist'))


module.exports = router