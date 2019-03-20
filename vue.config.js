const path = require('path');

function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    devServer: {
        host: '0.0.0.0',
        port: 8111,
        disableHostCheck: true,
        proxy: "http://127.0.0.1:8080/test"
    },
    chainWebpack: (config) => {
        config.resolve.alias
            .set('@ibizsys', resolve('src/ibizsys'))
            .set('@pages', resolve('src/pages'))
            .set('@components', resolve('src/components'))
            .set('@widget', resolve('src/widget'))
            .set('@engine', resolve('src/engine'))
    }
}