
const url = require("url")

module.exports = {
    
    get path() {
        let {pathname} = url.parse(this.req.url,true)
        return pathname
    }
}

// console.log(url.parse("https://www.baidu.com?hello=world", true))