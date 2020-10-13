const url = require('url');

// request对象是基于req进行的扩展
module.exports = {
    get path() { // Object.defineProperty
        let { pathname } = url.parse(this.req.url);
        return pathname
    },
    get query() {
        let { query } = url.parse(this.req.url, true,);
        return query
    }
}

// Object.defineProperty  => get ,set