const router = require('koa-router')()

// banner
router.get('/banner', require('./banner/banner'))

// 排行榜
router.get('/toplist', require('./toplist/toplist'))

// 排行榜详情
router.get('/toplist/detail', require('./toplist_detail/toplist_detail'))

// 分类歌单
router.get('/playlist', require('./playlist/playlist'))

// 歌单详情
router.get('/playlist/detail', require('./playlist_detail/playlist_detail'))

// 搜索
router.get('/search', require('./search/search'))

// 歌曲url
router.post('/music/url', require('./music_url/music_url'))

module.exports = router
