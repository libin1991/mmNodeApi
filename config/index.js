const musicType = process.env.musicType || 'QQ'

/**
 * 是否格式化字段
 * open 开启（ 默认）
 */
const format = 'open';

// 出错提示
const notFound = {
    message: 'not found',
    code: 404
}

// 参数不全
const notData = {
    message: '参数不全',
    code: 400
}

module.exports = {
    musicType,
    format,
    notFound
}