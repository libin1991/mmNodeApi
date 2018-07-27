const axios = require('../../util/http')
const QQ = require('../../config/qq')
const Netease = require('../../config/netease')
const config = require('../../config/index')
const formatData = require('../../model/music_url')

// 获取歌曲URL

module.exports = async (ctx, next) => {
    const musicType = ctx.query.musicType || config.musicType
    const httpFormat = ctx.query.format || config.format
    const id = ctx.request.body.id
    if (!id) {
        ctx.response.body = config.notData
        return false
    }
    if (musicType === QQ.mmConfig.musicType) {
        const params = Object.assign({}, QQ.commonParams, {
            g_tk: 5381,
            platform: 'h5',
            needNewCode: 1,
            uin: 0
        })
        const songtype = []
        id.forEach(song => {
            songtype.push(0)
        })
        await axios
            .qq(
                `https://u.y.qq.com/cgi-bin/musicu.fcg?_=${Date.now()}`,
                'post',
                {
                    comm: params,
                    url_mid: {
                        module: 'vkey.GetVkeyServer',
                        method: 'CgiGetVkey',
                        param: {
                            guid: QQ.getGuid(),
                            songmid: id,
                            uin: '0',
                            loginflag: 0,
                            platform: '23',
                            songtype
                        }
                    }
                },
                {
                    referer: 'https://y.qq.com/',
                    origin: 'https://y.qq.com',
                    'Content-type': 'application/x-www-form-urlencoded'
                }
            )
            .then(res => {
                // console.log(ctx.headers.cookie)
                if (res.code === QQ.HTTP_OK) {
                    const midurlinfo = res.url_mid.data.midurlinfo
                    const data = httpFormat === 'open' ? formatData(midurlinfo, 'QQ') : midurlinfo
                    ctx.response.body = {
                        data,
                        ...QQ.mmConfig
                    }
                } else {
                    ctx.response.body = res
                }
            })
            .catch(e => {
                ctx.response.body = config.notFound
            })
    } else {
        const params = {
            ids: id,
            br: 999000,
            csrf_token: ''
        }
        await axios
            .netease('http://music.163.com/weapi/song/enhance/player/url', 'post', params)
            .then(res => {
                if (res.code === Netease.HTTP_OK) {
                    const data = httpFormat === 'open' ? formatData(res.data, '163') : res.data
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
