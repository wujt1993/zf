module.exports = {
    port: {
        option: '-p, --port <v>',
        descriptor: 'set your port',
        usage: 'ks -p 3000',
        defaultValue: 8080
    },
    directory: {
        option: '-d --directory <v>',
        descriptor: 'set your directory',
        usage: 'ks -d D:',
        defaultValue: process.cwd()
    }
}