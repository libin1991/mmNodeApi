module.exports = {
    title: 'mmNodeApi',
    description: 'NodeJS 版 API',
    serviceWorker: true,
    themeConfig: {
        editLinks: true,
        nav: [
            {
              text: 'API',
              link: '/api/',
            },
            {
              text: 'GitHub',
              link: 'https://github.com/maomao1996/mmNodeApi'
            }
        ],
        sidebar: [
            ['/', '介绍'],
            ['/api/', 'API']
        ]
    }
}