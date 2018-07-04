const axios = require('../../util/http')
const QQ = require('../../config/qq')
const Netease = require('../../config/netease')
const config = require('../../config/index')
const formatData = require('../../model/toplist')

// 排行榜

const toplist = async (ctx, next) => {
    const musicType = ctx.query.musicType || config.musicType,
        httpFormat = ctx.query.format || config.format;
    if (musicType === QQ.mmConfig.musicType) {
        const params = Object.assign({}, QQ.commonParams, {
            platform: 'h5',
            uin: 0,
            needNewCode: 1
        })
        await axios.qq('https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg', 'get', params).then(res => {
            if (res.code === QQ.HTTP_OK) {
                const data = httpFormat === 'open' ? formatData(res.data.topList, 'QQ') : res.data.topList;
                ctx.response.body = {
                    data,
                    ...QQ.mmConfig
                }
            } else {
                ctx.response.body = res
            }
        }).catch(error => {
            ctx.response.body = config.notFound
            // console.log(e)
        })
    } else {
        const params = {
            csrf_token: ''
        }
        await axios.netease('http://music.163.com/weapi/toplist/detail', 'post', params).then(res => {
            if (res.code === Netease.HTTP_OK) {
                const data = httpFormat === 'open' ? formatData(res.list, '163') : res.list;
                ctx.response.body = {
                    data,
                    ...Netease.mmConfig
                }
            } else {
                ctx.response.body = res
            }
        }).catch(error => {
            ctx.response.body = config.notFound
        })
    }
}

module.exports = toplist