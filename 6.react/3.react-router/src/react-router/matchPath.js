const pathToRegexp = require("path-to-regexp");

function compilePath(pathname, options){
    let keys = [];
    let regexp = pathToRegexp(pathname, keys, options);
    return {regexp, keys}
}

function matchPath(pathname, options = {}) {
    let {exact=false, path="/", strict=false, sensitive=false} = options;
    let {keys,regexp} = compilePath(path, {
        strict,
        sensitive,
        end: exact
    })
    let match = pathname.match(regexp);
    if(!match) return null;
    const [url, ...values] = match;
    const isExact = url === pathname;
    if(exact && !isExact) return null;
    return {
        path,
        url,
        isExact,
        parmas: keys.reduce((memo, key,index)=>{
            return memo[key.name] = values[index]
        },{})
    }
}

export default matchPath