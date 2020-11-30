const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z]*`;  
const qnameCapture = `((?:${ncname}\\:)?${ncname})`;
const startTagOpen = new RegExp(`^<${qnameCapture}`); // 标签开头的正则 捕获的内容是标签名
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`); // 匹配标签结尾的 </div>
const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/; // 匹配属性的
const startTagClose = /^\s*(\/?)>/; // 匹配标签结束的 >



let root = null;
let currentParent = null;
let stack = [];
const ELEMENT_TYPE = 1;
const TEXT_TYPE = 3
function createASTElement (tagName,attrs){
    return {
        type: ELEMENT_TYPE,
        tag: tagName,
        attrs,
        children: [],
        parent: null
    }
}
function start(tagName, attrs) {
    let element = createASTElement(tagName, attrs);
    if(root == null) {
        root = element;
    }
    element.parent = currentParent;
    currentParent = element;
    stack.push(element);
}
function chars(text) {
    text = text.replace(/\s/g,'');
    if(text){
        currentParent.children.push({
            text,
            type:TEXT_TYPE
        })
    }
}
function end(tagName) {
    let element;
    if(stack.length == 0 || (element = stack.pop()).tag !== tagName){
        throw Error('标签名不匹配')
    }

    let currentParent = stack[stack.length - 1];
    if(currentParent) {
        currentParent.children.push(element);
        element.parent = currentParent;
    }
    
}
export function parseHTML(html) {
    while(html) {
        let textEnd = html.indexOf("<");
        if(textEnd == 0) {
            let startTagMatch = parseStartTag(); // 获取开始标签的标签名及属性
            if(startTagMatch) {
                start(startTagMatch.tagName, startTagMatch.attrs);
                continue;
            }
            let endTagMatch = html.match(endTag);
            if (endTagMatch) {
                end(endTagMatch[1])
                advance(endTagMatch[0].length);
                continue
            }
            
        }

        let text;
        if(textEnd >= 0){
            text = html.substring(0,textEnd);
        }
        if(text){
            advance(text.length);
            chars(text);
        }
        // if(textEnd > 0){
        //     let text = html.substring(0, textEnd);
        //     advance(text.length);
        //     chars(text); // 3解析文本
        // }



    }

    function advance(n) {
        html = html.substring(n);
    }

    function parseStartTag() {
        let start = html.match(startTagOpen);
        if(start) {
            const match = {
                tagName: start[1],
                attrs: []
            }
            advance(start[0].length); //// 将标签删除
            let end, attr;// 标签结束符 、 属性
            while(!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
                match.attrs.push({
                    name: attr[1],
                    value: attr[3] || attr[4] || attr[5]
                })
                advance(attr[0].length)
            }
            if (end) { // 去掉开始标签的 >
                advance(end[0].length);
                return match;
            }
        }
    }
    return root;
}