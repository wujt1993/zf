const serverConfig = {
    port: {
        option: '-p, --port <v>',
        descriptor: 'set your server port',
        usage: 'kinth --port 3000',
        default: 8080
    },
    directory: {
        option: '-d, --directory <v>',
        descriptor: 'set your server start directory',
        usage: 'kinth --directory d:',
        default: process.cwd()
    }
}

module.exports = serverConfig;