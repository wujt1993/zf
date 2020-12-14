const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g; //{{name}}

function genProps(attrs) {
    let str = '';
    attrs.forEach(attr => {
        if(attr.name == "style"){
            let obj = {};
            attr.value.split(";").forEach(item=>{
                if(item) {
                    let [key, value] = item.split(":");
                    obj[key] = value
                }
            })
            attr.value = JSON.stringify(obj);
        }
        str += `${attr.name}=${attr.value},`;
    });
    return `{${str.slice(0,-1)}}`;
} 

function gen(code) {
    if(code.type == 1) {
        return generate(code)
    }else if(code.type == 3) {
        let text = code.text;
        if(!defaultTagRE.test(text)){
            return `_v(${JSON.stringify(text)})`
        }

        let lastIndex = defaultTagRE.lastIndex = 0
        let tokens = [];
        let match,index;
        
        while (match = defaultTagRE.exec(text)) {
            index = match.index;
            if(index > lastIndex){
                tokens.push(JSON.stringify(text.slice(lastIndex,index)));
            }
            tokens.push(`_s(${match[1].trim()})`)
            lastIndex = index + match[0].length;
        }
        if(lastIndex < text.length){
            tokens.push(JSON.stringify(text.slice(lastIndex)))
        }
        return `_v(${tokens.join('+')})`;
    }
}

function genChildern(el) {
    let children = el.children;
    if(children && children.length > 0) {
        return `${children.map(c=>gen(c)).join(',')}`
    }else {
        return false
    }
}
export function generate(node){
    let children = genChildern(node)
    let code = `
        _c(
            ${node.tag},
            ${node.attrs.length > 0 ? genProps(node.attrs) : 'undefined'}
            ${
                children? `,${children}`:''
            }
        )
    `;
    return code;
}

// <div style="color:red">hello {{name}} <span></span></div>
// render(){
//    return _c('div',{style:{color:'red'}},_v('hello'+_s(name)),_c('span',undefined,''))
// } 