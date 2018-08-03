const axios = require('../../util/http');
const QQ = require('../../config/qq');
const Netease = require('../../config/netease');
const config = require('../../config/index');
const formatData = require('../../model/search');

// 搜索

module.exports = async (ctx, next) => {
    const musicType = ctx.query.musicType || config.musicType;
    const httpFormat = ctx.query.format || config.format;
    const keywords = ctx.query.keywords; // 搜索关键词
    /**
     * 搜索类型
     * 1：单曲
     */
    const type = parseInt(ctx.query.type, 10) || 1;
    const page = parseInt(ctx.query.page, 10) || 1; // 页码
    const limit = parseInt(ctx.query.limit, 10) || 20; // 每页数量
    if (!keywords) {
        ctx.response.body = config.notData;
        return false;
    }
    if (musicType === QQ.mmConfig.musicType) {
        const urlData = {
            1: 'https://c.y.qq.com/soso/fcgi-bin/client_search_cp' // 单曲
        };
        const url = urlData[type] ? urlData[type] : urlData[1];
        const paramsData = {
            // 单曲
            1: {
                w: keywords,
                p: page,
                perpage: limit,
                n: limit,
                catZhida: 1,
                t: type === 1 ? 0 : type,
                flag: 1,
                sem: 1,
                aggr: 1,
                remoteplace: 'txt.mqq.all',
                uin: 0,
                needNewCode: 0,
                platform: 'yqq',
                new_json: 1
            }
        };
        let params = paramsData[type];
        params = Object.assign({}, QQ.commonParams, params);
        await axios
            .qq(url, 'get', params)
            .then(res => {
                if (res.code === QQ.HTTP_OK) {
                    let data, songNum;
                    if (type === 1) {
                        const { list, totalnum } = res.data.song;
                        data = httpFormat === 'open' ? formatData(list, 'QQ', 'song') : list;
                        songNum = totalnum;
                    } else {
                        data = res;
                    }
                    ctx.response.body = {
                        data: {
                            list: data,
                            songNum,
                            type,
                            keywords
                        },
                        type,
                        ...QQ.mmConfig
                    };
                } else {
                    ctx.response.body = res;
                }
            })
            .catch(() => {
                ctx.response.body = config.notFound;
            });
    } else {
        const data = {
            s: keywords,
            csrf_token: '',
            offset: (page - 1) * limit,
            limit,
            type
        };
        await axios
            .netease('https://music.163.com/weapi/cloudsearch/get/web', 'post', data)
            .then(res => {
                if (res.code === Netease.HTTP_OK) {
                    let data, songNum;
                    if (type === 1) {
                        // 单曲
                        const { songs, songCount } = res.result;
                        data = httpFormat === 'open' ? formatData(songs, '163', 'song') : songs;
                        songNum = songCount;
                    }
                    ctx.response.body = {
                        data: {
                            list: data,
                            songNum,
                            type,
                            keywords
                        },
                        ...Netease.mmConfig
                    };
                } else {
                    ctx.response.body = res;
                }
            })
            .catch(() => {
                ctx.response.body = config.notFound;
            });
    }
};
