/**
 * 歌曲类模型
 */

class Song {
    constructor ({ id, mid, name, singer, album, pic, duration, musicType, privilege = null }) {
        this.id = id; // 歌曲ID
        this.mid = mid; // 歌曲ID
        this.name = name; // 歌曲名称
        this.singer = singer; // 歌手
        this.album = album; // 专辑
        this.pic = pic; // 封面图
        this.duration = duration; // 时长
        this.privilege = privilege; // 是否能播放
        this.musicType = musicType;
    }
}

function filterSinger (singers) {
    let arr = [];
    singers.forEach(item => {
        arr.push(item.name);
    });
    return arr.join('/');
}

// 歌曲数据格式化
function formatSongs (data, type) {
    let Songs = [];
    if (type === 'QQ') {
        data.forEach(item => {
            if (item.songid) {
                Songs.push(
                    new Song({
                        id: item.songid,
                        mid: item.songmid,
                        name: item.songname,
                        singer: item.singer.length > 0 && filterSinger(item.singer),
                        album: item.albumname,
                        pic: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${item.albummid}.jpg?max_age=2592000`,
                        duration: item.interval,
                        musicType: 'QQ'
                    })
                );
            }
        });
    } else {
        data.forEach(item => {
            if (item.id) {
                Songs.push(
                    new Song({
                        id: item.id,
                        mid: item.id,
                        name: item.name,
                        singer: item.ar.length > 0 && filterSinger(item.ar),
                        album: item.al.name,
                        pic: item.al.picUrl || null,
                        duration: item.dt / 1000,
                        musicType: '163'
                    })
                );
            }
        });
    }
    return Songs;
}

// 搜索单曲数据格式化

function formatSearchSongs (data, type) {
    let Songs = [];
    if (type === 'QQ') {
        data.forEach(item => {
            if (item.id) {
                Songs.push(
                    new Song({
                        id: item.id,
                        mid: item.mid,
                        name: item.name,
                        singer: item.singer.length > 0 && filterSinger(item.singer),
                        album: item.album.name,
                        pic: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${item.album.mid}.jpg?max_age=2592000`,
                        duration: item.interval,
                        privilege: item.album.id !== 0 && item.album.mid !== '',
                        musicType: 'QQ'
                    })
                );
            }
        });
    } else {
        data.forEach(item => {
            if (item.id) {
                Songs.push(
                    new Song({
                        id: item.id,
                        mid: item.id,
                        name: item.name,
                        singer: item.ar.length > 0 && filterSinger(item.ar),
                        album: item.al.name,
                        pic: item.al.picUrl || null,
                        duration: item.dt / 1000,
                        privilege: item.privilege.subp === 1 && item.privilege.st >= 0,
                        musicType: '163'
                    })
                );
            }
        });
    }
    return Songs;
}

module.exports = {
    filterSinger,
    Song,
    formatSongs,
    formatSearchSongs
};
