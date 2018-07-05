const axios = require('../../util/http')
const QQ = require('../../config/qq')
const config = require('../../config/index')
const formatData = require('../../model/toplist_detail')

// 排行榜详情

module.exports = async (ctx, next) => {
    const musicType = ctx.query.musicType || config.musicType;
    const httpFormat = ctx.query.format || config.format;
    if (musicType === QQ.mmConfig.musicType) {
        const params = Object.assign({}, QQ.commonParams, {
            topid: ctx.query.id,
            needNewCode: 1,
            uin: 0,
            tpl: 3,
            page: 'detail',
            type: 'top',
            platform: 'yqq'
        })
        await axios.qq('https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg', 'get', params).then(res => {
            if (res.code === QQ.HTTP_OK) {
                const data = httpFormat === 'open' ? formatData(res) : res;
                ctx.response.body = {
                    data,
                    ...QQ.mmConfig
                }
            } else {
                ctx.response.body = res
            }
        }).catch(() => {
            ctx.response.body = config.notFound
        })
    } else {
        ctx.redirect(`/playlist/detail?${ctx.querystring}`);
    }
}
