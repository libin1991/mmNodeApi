/**
 * 分类歌单类模型
 */

class PlayList {
    constructor ({
        id,
        name,
        pic,
        creator,
        playNum
    }) {
        this.id = id; // 歌单id
        this.name = name; // 歌单名称
        this.pic = pic; // 歌单封面
        this.creator = creator; // 歌单创建者信息（头像、昵称、ID）
        this.playNum = playNum; // 播放数
    }
}

// QQ
function createQqPlayList (data) {
    return new PlayList({
        id: Number(data.dissid),
        name: data.dissname,
        pic: data.imgurl,
        creator: {
            uid: data.creator.encrypt_uin,
            name: data.creator.name,
            pic: null
        },
        playNum: data.listennum
    })
}

// 网易
function createNeteasePlayList (data) {
    return new PlayList({
        id: data.id,
        name: data.name,
        pic: data.coverImgUrl,
        creator: {
            uid: data.creator.userId,
            name: data.creator.nickname,
            pic: data.creator.avatarUrl
        },
        playNum: data.playCount
    })
}

module.exports = function formatPlayList (data, type) {
    let list = []
    if (type === 'QQ') {
        data.forEach(item => {
            item.dissid && list.push(createQqPlayList(item))
        })
    } else {
        data.forEach(item => {
            item.id && list.push(createNeteasePlayList(item))
        })
    }
    return list
}
