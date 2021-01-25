
const pathtoRegexp = require("path-to-regexp")
const cache = {};
function compilePath(path, options) {
    let cacheKey = path + JSON.stringify(options);
    if (cache[cacheKey]) return cache[cacheKey];
    let keys = [];
    let regexp = pathtoRegexp(path, keys, options);
    let result = {regexp, keys}
    cache[cacheKey] = result;
    return result;

}
function matchPath(pathname, options = {}) {
    let { exact = false, path = "/", sensitive = false, strict = false } = options;
    let { keys, regexp } = compilePath(path, { end: exact, sensitive, strict });
    const match = regexp.exec(pathname);
    if(!match) return null;
    const [url,...values]= match;
    const isExact = pathname === url;
    if(!isExact && exact) return null;
    return {
        path, 
        url,
        isExact,//是否精确匹配
        params:keys.reduce((memo,key,index)=>{//{ id: '100', name: 'zhufeng' }
            memo[key.name]=values[index];
            return memo;
        },{})//路径参数
    }
}
export default matchPath;