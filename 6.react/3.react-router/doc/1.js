
const pathToRegexp = require("path-to-regexp");

/**
 * sensitive 是否大小写敏感 (默认值: false)
 * strict 是否允许结尾有一个可选的/ (默认值: false)
 * end 是否匹配整个字符串 (默认值: true)
 */
let regexp = pathToRegexp("/home", [], {});
console.log(regexp); // /^\/home\/?$/i
console.log(regexp.test('/home'));//true
console.log(regexp.test('/home/'));//true
console.log(regexp.test('/home/2'));//false

let regexp1 = pathToRegexp("/home", [], {end: false});
console.log(regexp1); //  /^\/home\/?(?=\/|$)/i
console.log(regexp1.test("/home/2")); // true
console.log(regexp1.test("/home2")); // false

let regexp2 = pathToRegexp("/home", [], {strict: true});
console.log(regexp2); // /^\/home$/i
console.log(regexp2.test('/home/'));//false

let params = [];
let regexp3 = pathToRegexp("/user/:id", params, {});
console.log(regexp3); // /^\/user\/(?:([^\/]+?))\/?$/i
console.log(params); //  [ { name: 'id', optional: false, offset: 7 } ]
console.log(regexp3.exec("/user/1/"))