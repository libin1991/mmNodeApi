// 成功状态码
const HTTP_OK = 0

// header
const headers = {
    referer: 'https://c.y.qq.com/',
    host: 'c.y.qq.com'
}

// 请求参数
const commonParams = {
    g_tk: 1928093487,
    inCharset: 'utf-8',
    outCharset: 'utf-8',
    notice: 0,
    format: 'json'
}

// 请求参数
const options = {
    param: 'jsonpCallback',
    prefix: 'jp'
}

const mmConfig = {
    code: 200,
    musicType: 'QQ'
}

module.exports = {
    HTTP_OK,
    commonParams,
    options,
    mmConfig
}