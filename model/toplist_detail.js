/**
 * 排行榜详情类模型
 */
const {
    PlayListDetail
} = require('./playlist_detail')
const {
    Song,
    filterSinger
} = require('./song')

function createQqSongs (music) {
    const data = music.data;
    return new Song({
        id: data.songid,
        mid: data.songmid,
        name: data.songname,
        singer: data.singer.length > 0 && filterSinger(data.singer),
        album: data.albumname,
        image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${data.albummid}.jpg?max_age=2592000`,
        duration: data.interval,
        musicType: 'QQ'
    })
}

// 歌曲数据格式化
function formatSongs (data) {
    let Songs = [];
    data.forEach(item => {
        if (item.data.songid) {
            Songs.push(createQqSongs(item))
        }
    });
    return Songs
}

function formatTopListDetail (data) {
    return new PlayListDetail({
        id: Number(data.topinfo.topID),
        name: data.topinfo.ListName,
        creator: null,
        pic: data.topinfo.pic,
        createTime: null,
        updateTime: data.update_time,
        desc: data.topinfo.info,
        songNum: data.total_song_num,
        playNum: null,
        shareNumt: null,
        commentNum: data.comment_num,
        songList: formatSongs(data.songlist)
    })
}

module.exports = formatTopListDetail
