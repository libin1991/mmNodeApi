module.exports = {
    title: 'mmNodeApi',
    description: 'NodeJS 版 API',
    serviceWorker: true,
    themeConfig: {
        editLinks: true,
        nav: [
            {
                text: 'API',
                link: '/api/'
            },
            {
                text: '在线音乐播放器（PC）',
                link: 'http://music.mtnhao.com/#/music/playlist'
            },
            {
                text: 'GitHub',
                link: 'https://github.com/maomao1996/mmNodeApi'
            }
        ],
        sidebar: [
            ['/introduce/', '介绍'],
            ['/api/', 'API']
        ]
    }
}
