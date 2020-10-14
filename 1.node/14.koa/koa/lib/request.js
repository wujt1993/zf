const url = require('url');
module.exports = {

    get path() {
        let {pathname} = url.parse(this.req.url, true)
        return pathname
    },
    
    get query() {
        let {query} = url.parse(this.req.url, true)
        return query
    }
}
