// const {runLoaders} = require("loader-runner");
const {runLoaders} = require("./loader-runner");
const path = require("path");
const fs = require("fs");
const filePath = path.resolve(__dirname, 'src', "index.js");
let request = `inline-loader1!inline-loader2!${filePath}`;
let parts = request.replace(/^-?!+/g, "").split("!");
let resource = parts.pop();
let resolveLoader = (loader) => path.resolve(__dirname, 'loaders2', loader);
let inlineLoaders = parts.map(resolveLoader);
let loaders = [];

let rules = [
    { 
        test: /.js$/,
        enforce: 'post',
        use: ['post-loader1', 'post-loader2']
    },
    { 
        test: /.js$/,
        use: ['normal-loader1', 'normal-loader2']
    },
    { 
        test: /.js$/,
        enforce: 'pre',
        use: ['pre-loader1', 'pre-loader2']
    }
]
let postLoaders = [];
let preLoaders = [];
let normalLoaders = [];
for(let i = 0; i < rules.length; i++) {
    let rule = rules[i];
    if(rule.test.test(resource)) {
        if(rule.enforce === 'post') {
            postLoaders = [...postLoaders, ...rule.use];
        }else if(rule.enforce === 'pre') {
            preLoaders = [...preLoaders, ...rule.use];
        }else {
            normalLoaders = [...normalLoaders, ...rule.use];
        }
    }
}

postLoaders = postLoaders.map(resolveLoader);
preLoaders = preLoaders.map(resolveLoader);
normalLoaders = normalLoaders.map(resolveLoader);
// !! 只要内联loader
// -! 不包括 pre 和normal
// ! 不包括normal
if(request.startsWith("!!")) {
    loaders = [...inlineLoaders];
}else if(request.startsWith("-!")){
    loaders = [...postLoaders, ...inlineLoaders];
}else if(request.startsWith("!")){
    loaders = [...postLoaders, ...inlineLoaders, ...preLoaders];
}else{
    loaders = [...postLoaders, ...inlineLoaders, ...normalLoaders, ...preLoaders];
}


runLoaders({
    resource,
    loaders,
    context: {name:'zhufeng'},
	readResource: fs.readFile.bind(fs)
}, function(err, result) {
    // console.log(err);
    console.log(result)
})

