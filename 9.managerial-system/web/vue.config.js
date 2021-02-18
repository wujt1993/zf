module.exports = {
    devServer: {
        proxy: {
            '/sys': {
                target: 'http://localhost:3000/',
                ws: true,
                changeOrigin: true
            },
            '/upload': {
                target: 'http://localhost:3000/',
                ws: true,
                changeOrigin: true
            },
        }
    }
}