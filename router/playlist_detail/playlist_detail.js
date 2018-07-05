const axios = require('../../util/http')
const QQ = require('../../config/qq')
const Netease = require('../../config/netease')
const config = require('../../config/index')
const {
    formatData
} = require('../../model/playlist_detail')

// 歌单详情

module.exports = async (ctx, next) => {
    const musicType = ctx.query.musicType || config.musicType;
    const httpFormat = ctx.query.format || config.format;
    if (musicType === QQ.mmConfig.musicType) {
        const params = Object.assign({}, QQ.commonParams, {
            disstid: ctx.query.id,
            type: 1,
            json: 1,
            utf8: 1,
            onlysong: 0,
            platform: 'yqq',
            hostUin: 0,
            needNewCode: 0
        })
        await axios.qq('https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg', 'get', params).then(res => {
            if (res.code === QQ.HTTP_OK) {
                const data = httpFormat === 'open' ? formatData(res.cdlist[0], 'QQ') : res.cdlist[0];
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
        const params = {
            id: ctx.query.id,
            n: 100000,
            s: ctx.query.s || 8,
            csrf_token: ''
        }
        await axios.netease('http://music.163.com/weapi/v3/playlist/detail', 'post', params).then(res => {
            // console.log('cookies',ctx.cookies)
            // console.log(res.playlist)
            if (res.code === Netease.HTTP_OK) {
                // console.log(res.code)
                const data = httpFormat === 'open' ? formatData(res.playlist, '163') : res.playlist;
                // console.log('data', res.playlist)
                ctx.response.body = {
                    data,
                    ...Netease.mmConfig
                }
                // const data = res.playlist
            } else {
                ctx.response.body = res
            }
        }).catch(() => {
            ctx.response.body = config.notFound
        })
    }
}
