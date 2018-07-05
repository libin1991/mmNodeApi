/**
 * banner类模型
 */

class Banner {
    constructor ({
        id,
        link,
        pic
    }) {
        this.id = id; // id
        this.link = link; // 跳转链接
        this.pic = pic; // 图片
    }
}

// QQ
function createQqBanner (qq) {
    return new Banner({
        id: qq.id,
        link: qq.linkUrl,
        pic: qq.picUrl
    })
}

// 网易
function createNeteaseBanner (net) {
    return new Banner({
        id: net.targetId,
        link: net.url,
        pic: net.picUrl
    })
}

function formatBanner (list, type) {
    let arr = [];
    if (type === 'QQ') {
        list.forEach(item => {
            arr.push(createQqBanner(item))
        });
    } else {
        list.forEach(item => {
            arr.push(createNeteaseBanner(item))
        });
    }
    return arr
}

module.exports = formatBanner
