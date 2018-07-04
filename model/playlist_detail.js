/**
 * 歌单详情类模型
 */
const {
    formatSongs
} = require('./song')

class PlayListDetail {
    constructor({
        id,
        name,
        pic,
        creator,
        createTime,
        updateTime,
        desc,
        songNum,
        playNum,
        shareNum,
        commentNum,
        songList
    }) {
        this.id = id; //歌单ID
        this.name = name; //歌单名称
        this.pic = pic; //歌单封面
        this.creator = creator; //歌单创建者信息（头像、昵称、ID）
        this.createTime = createTime; //歌单创建时间
        this.updateTime = updateTime; //歌单更新时间
        this.desc = desc; //歌单描述
        this.songNum = songNum; //歌曲数量
        this.playNum = playNum; //播放数
        this.shareNum = shareNum; //分享数
        this.commentNum = commentNum; //评论数
        this.songList = songList //歌曲列表
    }
}

function formatPlayListDetail(data, type) {
    if (type === 'QQ') {
        return new PlayListDetail({
            id: Number(data.disstid),
            name: data.dissname,
            pic: data.logo,
            creator: {
                uid: data.uin,
                pic: data.headurl,
                name: data.nickname
            },
            createTime: data.ctime,
            updateTime: data.update_time,
            desc: data.desc,
            songNum: data.total_song_num,
            playNum: data.visitnum,
            shareNum: null,
            commentNum: null,
            songList: formatSongs(data.songlist, 'QQ')
        })
    } else {
        return new PlayListDetail({
            id: data.id,
            name: data.name,
            pic: data.coverImgUrl,
            creator: {
                uid: data.creator.userId,
                pic: data.creator.avatarUrl,
                name: data.creator.nickname
            },
            createTime: data.createTime,
            updateTime: data.updateTime,
            desc: data.description,
            songNum: data.trackCount,
            playNum: data.playCount,
            shareNum: data.shareCount,
            commentNum: data.commentCount,
            songList: formatSongs(data.tracks, '163')
        })
    }
}

module.exports = {
    PlayListDetail,
    formatData: formatPlayListDetail
}
