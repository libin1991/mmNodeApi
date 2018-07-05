/**
 * 歌曲类模型
 */

class Song {
    constructor ({
        id,
        mid,
        name,
        singer,
        album,
        pic,
        duration,
        musicType
    }) {
        this.id = id; // 歌曲ID
        this.mid = mid; // 歌曲ID
        this.name = name; // 歌曲名称
        this.singer = singer; // 歌手
        this.album = album; // 专辑
        this.pic = pic; // 封面图
        this.duration = duration; // 时长
        this.musicType = musicType
    }
}

function filterSinger (singers) {
    let arr = [];
    singers.forEach(item => {
        arr.push(item.name)
    });
    return arr.join('/')
}

function createNeteaseSongs (music) {
    return new Song({
        id: music.id,
        mid: music.id,
        name: music.name,
        singer: music.ar.length > 0 && filterSinger(music.ar),
        album: music.al.name,
        pic: music.al.picUrl || null,
        duration: music.dt / 1000,
        musicType: '163'
    })
}

function createQqSongs (music) {
    return new Song({
        id: music.songid,
        mid: music.songmid,
        name: music.songname,
        singer: music.singer.length > 0 && filterSinger(music.singer),
        album: music.albumname,
        pic: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${music.albummid}.jpg?max_age=2592000`,
        duration: music.interval,
        musicType: 'QQ'
    })
}

// 歌曲数据格式化
function formatSongs (data, type) {
    let Songs = [];
    if (type === 'QQ') {
        data.forEach(item => {
            if (item.songid) {
                Songs.push(createQqSongs(item))
            }
        });
    } else {
        data.forEach(item => {
            if (item.id) {
                Songs.push(createNeteaseSongs(item))
            }
        });
    }
    return Songs
}

module.exports = {
    filterSinger,
    Song,
    formatSongs
}
