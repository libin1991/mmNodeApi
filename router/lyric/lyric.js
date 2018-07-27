const axios = require('../../util/http')
const QQ = require('../../config/qq')
const Netease = require('../../config/netease')
const config = require('../../config')
const Lyric = require('../../model/lyric')

// 获取歌曲URL

/* eslint-disable */
MusicJsonCallback = data => data
/* eslint-enable */

module.exports = async (ctx, next) => {
    const musicType = ctx.query.musicType || config.musicType
    const httpFormat = ctx.query.format || config.format
    const id = ctx.query.id
    if (!id) {
        ctx.response.body = config.notData
        return false
    }
    if (musicType === QQ.mmConfig.musicType) {
        const params = Object.assign({}, QQ.commonParams, {
            songmid: id,
            platform: 'yqq',
            hostUin: 0,
            needNewCode: 0,
            categoryId: 10000000,
            pcachetime: +new Date(),
            format: 'jsonp',

            g_tk: 1941619397,
            loginUin: 0,
            notice: 0
        })
        await axios
            .qq('https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg', 'get', params)
            .then(res => {
                // console.log(ctx.headers.cookie)
                // var reg = /^\w+\(({.+})\)$/
				const resDate = eval(res) // eslint-disable-line
                if (resDate.code === QQ.HTTP_OK && resDate.lyric) {
                    const lyric = Buffer.from(resDate.lyric, 'base64').toString()
                    const data = httpFormat === 'open' ? new Lyric(lyric, 'QQ') : lyric
                    ctx.response.body = {
                        data,
                        ...QQ.mmConfig
                    }
                } else {
                    ctx.response.body = resDate
                }
            })
            .catch(e => {
                ctx.response.body = config.notFound
            })
    } else {
        await axios
            .netease(`http://music.163.com/weapi/song/lyric?os=osx&id=${id}&lv=-1&kv=-1&tv=-1`, 'post', {})
            .then(res => {
                if (res.code === Netease.HTTP_OK && res.lrc) {
                    const lrc = res.lrc.lyric
                    const data = lrc && httpFormat === 'open' ? new Lyric(lrc, '163') : lrc
                    ctx.response.body = {
                        data,
                        ...Netease.mmConfig
                    }
                } else {
                    ctx.response.body = res
                }
            })
            .catch(e => {
                ctx.response.body = config.notFound
            })
    }
}
