/**
 * 热搜类模型
 */

module.exports = function formatSearchHot (data, type) {
    if (type === 'QQ') {
        return data.map(item => item.k);
    } else {
        return data.map(item => item.first);
    }
};
