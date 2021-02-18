let crypto = require("crypto");

let md5Sign = (data, salt) => {
    let  md5 = crypto.createHash('md5').update(data+'').digest('hex');
    md5 = crypto.createHash('md5').update(md5 + salt).digest('hex');
    return md5;
}

let md5Match = (target, data, salt) => {
    let md5 = crypto.createHash('md5').update(data + '').digest('hex');
    md5 = crypto.createHash('md5').update(md5 + salt).digest('hex');
    return md5 === target
}
module.exports = {
    md5Sign,
    md5Match
}