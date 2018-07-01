/**
 * 排行榜类模型
 */

class TopList {
    constructor({
        id,
        pic,
        title,
        songList
    }) {
        this.id = id; // id
        this.pic = pic; // 图片
        this.title = title; // 标题
        this.songList = songList // 热门歌曲列表
    }
}

class SongList {
    constructor({
        song,
        singer
    }) {
        this.song = song; // 歌曲名
        this.singer = singer // 歌手名
    }
}

function formatSongList(list,type) {
    let arr = [];
    if (type === 'QQ'){
        list.forEach(item => {
            arr.push(new SongList({
                song: item.songname,
                singer: item.singername
            }))
        })
    } else {
        list.forEach(item => {
            arr.push(new SongList({
                song: item.first,
                singer: item.second
            }))
        })
    }
    return arr
}

// QQ
function createQqTopList(qq) {
    const songList = formatSongList(qq.songList,'QQ')
    return new TopList({
        id: qq.id,
        pic: qq.picUrl,
        title: qq.topTitle,
        songList,
    })
}

// 网易
function createNeteaseTopList(net) {
    const songList = formatSongList(net.tracks)
    return new TopList({
        id: net.id,
        pic: net.coverImgUrl,
        title: net.name,
        songList
    })
}

function formatTopList(list, type) {
    let arr = [];
    if (type === 'QQ') {
        list.forEach(item => {
            arr.push(createQqTopList(item))
        });
    } else {
        list.forEach(item => {
            arr.push(createNeteaseTopList(item))
        });
    }
    return arr
}

module.exports = formatTopList