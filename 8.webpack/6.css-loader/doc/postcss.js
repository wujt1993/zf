var postcss = require("postcss");

let options = {};
const cssPlugin = (options) => {
    return (root, result) =>{
        root.walkDecls((decl)=>{
            if(decl.value.endsWith('px')) {
                decl.value = parseFloat(decl.value) / 75 + 'rem'
            }
        })
    }
}

let pipeline = postcss([cssPlugin(options)]);
let inputSource = `
    #root{
        width: 750px;
    }
`
pipeline.process(inputSource).then(result=>{
    console.log(result.css);
})