const axios = require('../../util/http')
const QQ = require('../../config/qq')
const Netease = require('../../config/netease')
const config = require('../../config/index')
const formatTopList = require('../../model/toplist')

// 搜索

const search = async (ctx, next) => {
    const musicType = ctx.query.musicType || config.musicType;
    const httpFormat = ctx.query.format || config.format;
    const keywords = ctx.query.keywords;
    const type = Number(ctx.query.type) || 1;
    const page = Number(ctx.query.page) || 1;
    const limit = Number(ctx.query.limit) || 20;
    if (!ctx.query.keywords) {
        ctx.response.body = config.notData;
        return false
    }
    if (musicType === QQ.mmConfig.musicType) {
        const urlData = {
            1: 'https://c.y.qq.com/soso/fcgi-bin/client_search_cp',
            1000: 'https://c.y.qq.com/soso/fcgi-bin/client_music_search_songlist',
            1002: 'https://c.y.qq.com/soso/fcgi-bin/client_search_user'
        }
        const url = urlData[type] ? urlData[type] : urlData[1]
        const paramsData = {
            1: {
                w: keywords,
                p: page,
                perpage: limit,
                n: limit,
                catZhida: 0,
                zhidaqu: 1,
                t: type === 1 ? 0 : type,
                flag: 1,
                ie: 'utf-8',
                sem: 1,
                aggr: 0,
                remoteplace: 'txt.mqq.all',
                uin: 0,
                needNewCode: 1,
                platform: 'yqq'
            },
            1000: {
                remoteplace: 'sizer.yqq.playlist_next',
                searchid: 44614488231867797,
                flag_qc: 0,
                page_no: page,
                num_per_page: limit + 1,
                query: keywords,
                jsonpCallback: 'jsonpCallback',
                loginUin: 0,
                hostUin: 0,
                platform: 'yqq',
                needNewCode: 0
            },
            1002: {

            }
        }
        let params = paramsData[type] ? paramsData[type] : paramsData[1]
        params = Object.assign({}, QQ.commonParams, params)
        await axios.qq(url, 'get', params).then(res => {
            if (res.code === QQ.HTTP_OK) {
                let data;
                if (type === 1000) {
                    data = res
                } else {
                    data = res
                }
                // const data = httpFormat === 'open' ? formatTopList(res.data.topList, 'QQ') : res.data.topList;
                ctx.response.body = {
                    data,
                    type,
                    ...QQ.mmConfig
                }
            } else {
                ctx.response.body = res
            }
        }).catch(() => {
            ctx.response.body = config.notFound
        })
    } else {
        const data = {
            csrf_token: ''
        }
        await axios.netease('http://music.163.com/weapi/toplist/detail', 'post', data).then(res => {
            if (res.code === Netease.HTTP_OK) {
                const topList = httpFormat === 'open' ? formatTopList(res.list, '163') : res.list;
                ctx.response.body = {
                    topList,
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

module.exports = search
