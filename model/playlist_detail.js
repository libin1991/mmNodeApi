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
        coverImgUrl,
        avatar,
        createTime,
        updateTime,
        desc,
        songnum,
        playCount,
        shareCount,
        commentCount,
        songList
    }) {
        this.id = id; //歌单ID
        this.name = name; //歌单名称
        this.coverImgUrl = coverImgUrl; //歌单封面
        this.avatar = avatar; //歌单创建者信息（头像、昵称、ID）
        this.createTime = createTime; //歌单创建时间
        this.updateTime = updateTime; //歌单更新时间
        this.desc = desc; //歌单描述
        this.songnum = songnum; //歌曲数量
        this.playCount = playCount; //播放数
        this.shareCount = shareCount; //分享数
        this.commentCount = commentCount; //评论数
        this.songList = songList //歌曲列表
    }
}

function formatPlayListDetail(data, type) {
    if (type === 'QQ') {
        return new PlayListDetail({
            id: Number(data.disstid),
            name: data.dissname,
            coverImgUrl: data.logo,
            avatar: {
                uid: data.uin,
                pic: data.headurl,
                name: data.nickname
            },
            createTime: data.ctime,
            updateTime: data.update_time,
            desc: data.desc,
            songnum: data.total_song_num,
            playCount: data.visitnum,
            shareCount: null,
            commentCount: null,
            songList: formatSongs(data.songlist, 'QQ')
        })
    } else {
        return new PlayListDetail({
            id: data.id,
            name: data.name,
            coverImgUrl: data.coverImgUrl,
            avatar: {
                uid: data.creator.userId,
                pic: data.creator.avatarUrl,
                name: data.creator.nickname
            },
            createTime: data.createTime,
            updateTime: data.updateTime,
            desc: data.description,
            songnum: data.trackCount,
            playCount: data.playCount,
            shareCount: data.shareCount,
            commentCount: data.commentCount,
            songList: formatSongs(data.tracks, '163')
        })
    }
}

module.exports = {
    PlayListDetail,
    formatData: formatPlayListDetail
}
