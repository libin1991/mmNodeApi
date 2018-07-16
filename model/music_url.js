/**
 * 歌曲URL类模型
 */

class MusicUrl {
    constructor ({ id, url, musicType }) {
        this.id = id // 歌曲id
        this.url = url // 歌曲播放地址
        // this.br = br // 歌曲音质
        // this.size = size // 歌曲大小
        this.musicType = musicType // 歌曲来源
    }
}

// 网易
function createNeteaseMusicUrl (data) {
    return new MusicUrl({
        id: data.id,
        url: data.url,
        musicType: '163'
    })
}

// QQ
function createQqMusicUrl (data) {
    return new MusicUrl({
        id: data.songmid,
        url: data.purl,
        musicType: 'QQ'
    })
}

function formatMusicUrl (list, type) {
    let arr = []
    if (type === 'QQ') {
        list.forEach(item => {
            arr.push(createQqMusicUrl(item))
        })
    } else {
        list.forEach(item => {
            arr.push(createNeteaseMusicUrl(item))
        })
    }
    return arr
}

module.exports = formatMusicUrl
