const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g

function genProps(attrs) {
    let str = '';
    for(let i = 0; i < attrs.length; i++) {
        let attr = attrs[i];
        if(attr.name=="style") {
            let obj = {};
            attr.value.split(';').forEach(item => {
                if(item) {
                    let [key, value] = item.split(':');
                    obj[key] = value
                }
            });
            attr.value = obj
        }

        str += `${attr.name}:${JSON.stringify(attr.value)},`
    }
    return `{${str.slice(0,-1)}}`
}
function gen(node) {
    if(node.type == 1) {
        return generate(node)
    }else {
        let text = node.text;
        if(defaultTagRE.test(text)) {
            let tokens = [];
            let match ;
            let index = 0;
            let lastIndex = defaultTagRE.lastIndex = 0;
            while(match = defaultTagRE.exec(text)){ // aa {{ age }} haha 
                index = match.index;
                if(index >lastIndex){
                    tokens.push(JSON.stringify(text.slice(lastIndex,index)));
                }
                tokens.push(`_s(${match[1].trim()})`);
                lastIndex = index + match[0].length;
            }
            if(lastIndex < text.length){
                tokens.push(JSON.stringify(text.slice(lastIndex)))
            }
            return  `_v(${tokens.join('+')})`
        }else {
            return `_v(${JSON.stringify(text)})`
        }
    }
}

function genChildren(el) {
    const children  = el.children;
    if(children){
        return children.map(child=>gen(child)).join(',')
    }
}
export function generate(el) {
    let children = genChildren(el);
    let code = `_c('${el.tag}',${el.attrs.length!=0?genProps(el.attrs):'undefined'}${children?','+children:''})`;
    return code;   
}

/**
 * 将字符串 转成可运行的js
 * <div id="app" a=1 b ="2">
 *    hello 
 *    <div style="color: red">
 *         <span>! {{ name}} !</span>
 *    </div>
 * </div>
 * _c('div',{id:'app',a:1,b:'2'},
 *      _v("hello"),
 *      _c('div', {style:{color: 'red}}, 
 *          _c('span',undefined, 
 *              _v('!' + _s(name) + '!')
 *          )
 *      )
 * )
 */