const axios = require('../../util/http');
const QQ = require('../../config/qq');
const Netease = require('../../config/netease');
const config = require('../../config/index');
const formatData = require('../../model/search_hot');

// 热搜

module.exports = async (ctx, next) => {
    const musicType = ctx.query.musicType || config.musicType;
    const httpFormat = ctx.query.format || config.format;
    if (musicType === QQ.mmConfig.musicType) {
        const params = Object.assign({}, QQ.commonParams, {
            platform: 'h5',
            uin: 0,
            needNewCode: 1
        });
        await axios
            .qq('https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg', 'get', params)
            .then(res => {
                if (res.code === QQ.HTTP_OK) {
                    const data = httpFormat === 'open' ? formatData(res.data.hotkey, 'QQ') : res.data.hotkey;
                    ctx.response.body = {
                        data,
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
        const params = {
            type: 1111
        };
        await axios
            .netease('http://music.163.com/weapi/search/hot', 'post', params)
            .then(res => {
                if (res.code === Netease.HTTP_OK) {
                    const data = httpFormat === 'open' ? formatData(res.result.hots, '163') : res.result.hots;
                    ctx.response.body = {
                        data,
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
