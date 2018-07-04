const axios = require('../../util/http')
const QQ = require('../../config/qq')
const Netease = require('../../config/netease')
const config = require('../../config/index')
const formatData = require('../../model/banner')

// 轮播

const banner = async (ctx, next) => {
    const musicType = ctx.query.musicType || config.musicType,
        httpFormat = ctx.query.format || config.format;
    if (musicType === QQ.mmConfig.musicType) {
        const params = Object.assign({}, QQ.commonParams, {
            platform: 'h5',
            uin: 0,
            needNewCode: 1
        })
        await axios.qq('https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg', 'get', params).then(res => {
            if (res.code === QQ.HTTP_OK) {
                const data = httpFormat === 'open' ? formatData(res.data.slider, 'QQ') : res.data.slider
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
        await axios.netease('http://music.163.com/discover', 'get', null).then(res => {
            try {
                const pattern = /<script[^>]*>\s*window\.Gbanners\s*=\s*([^;]+?);\s*<\/script>/g;
                let data = eval(`(${pattern.exec(res)[1]})`)
                data = httpFormat === 'open' ? formatData(data, '163') : data
                ctx.response.body = {
                    data,
                    ...Netease.mmConfig
                }
            } catch (error) {
                // console.log(error)
                ctx.response.body = config.notFound
            }
        }).catch(error => {
            ctx.response.body = config.notFound
            // console.log(e)
        })
    }
}

module.exports = banner