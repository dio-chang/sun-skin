module.exports = {
    port: {
        www:8888,
        liveReload: 35740
    },

    // 路径配置
    path: {
        // 程序主目录
        app: 'app',
        // 发布目录
        dist: 'dist'
    },

    // 配置不同的cdn域
    cdnDomain: {
        dev: 'http://10.10.2.108:8888',
        beta: 'http://10.10.2.108:8888',
        prepare: 'http://10.10.2.108:8888',
        prod: 'http://10.10.2.108:8888'
    }

};
