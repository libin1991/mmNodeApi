const axios = require('../../util/http')
const QQ = require('../../config/qq')
const Netease = require('../../config/netease')
const config = require('../../config/index')
const formatData = require('../../model/playlist')

// 分类歌单

module.exports = async (ctx, next) => {
    const musicType = ctx.query.musicType || config.musicType
    const httpFormat = ctx.query.format || config.format;
    if (musicType === QQ.mmConfig.musicType) {
        const params = Object.assign({}, QQ.commonParams, {
            picmid: 1,
            rnd: Math.random(),
            g_tk: 452748401,
            jsonpCallback: 'getPlaylist',
            loginUin: 0,
            hostUin: 0,
            platform: 'yqq',
            needNewCode: 0,
            categoryId: 10000000,
            sortId: ctx.query.order === 'new' ? 2 : 5,
            sin: ctx.query.offset || 0,
            ein: (ctx.query.limit - 1) || 19
        })
        await axios.qq('https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg', 'get', params).then(res => {
            if (res.code === QQ.HTTP_OK) {
                const {
                    list,
                    sum
                } = res.data;
                const data = httpFormat === 'open' ? formatData(list, 'QQ') : list;
                ctx.response.body = {
                    data,
                    total: sum,
                    ...QQ.mmConfig
                }
            } else {
                ctx.response.body = res
            }
        }).catch(() => {
            ctx.response.body = config.notFound
        })
    } else {
        const params = {
            cat: ctx.query.cat || '全部',
            order: ctx.query.order || 'hot',
            offset: ctx.query.offset || 0,
            total: ctx.query.total ? 'true' : 'false',
            limit: ctx.query.limit || 20
        }
        await axios.netease('http://music.163.com/weapi/playlist/list', 'post', params).then(res => {
            if (res.code === Netease.HTTP_OK) {
                const data = httpFormat === 'open' ? formatData(res.playlists, '163') : res.playlists;
                ctx.response.body = {
                    data,
                    total: res.total,
                    ...Netease.mmConfig
                }
            } else {
                ctx.response.body = res
            }
        }).catch(() => {
            ctx.response.body = config.notFound
        })
    }
}
