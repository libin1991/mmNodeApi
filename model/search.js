/**
 * 搜索类模型
 */
const { formatSearchSongs } = require('./song');

module.exports = function formatSearch (data, type, searchType) {
    let list;
    if (searchType === 'song') {
        list = formatSearchSongs(data, type);
    }
    return list;
};
