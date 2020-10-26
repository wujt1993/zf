
const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z]*`; // aa-aa 
const qnameCapture = `((?:${ncname}\\:)?${ncname})`; //aa:aa
const startTagOpen = new RegExp(`^<${qnameCapture}`); // 可以匹配到标签名  [1]
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`); //[0] 标签的结束名字
//    style="xxx"   style='xxx'  style=xxx
const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
const startTagClose = /^\s*(\/?)>/;


export function parseHTML(html) {
    let root;
    let currentParent;
    let stack = []


    function createASTElement(tag, attrs) {
        return {
            tag,
            attrs,
            type: 1,
            children: [],
            parent: null
        }

    }


    function start(tagName, attrs) {
        let node = createASTElement(tagName, attrs);
        if(root == null) {
            root = node;
        }
        currentParent = node;
        stack.push(node);
    }

    function end(tagName) {
        let node = stack.pop();
        if(node.tag != tagName) {
            throw Error("解析报错");
        }

        currentParent = stack[stack.length - 1];
        if(currentParent) {
            node.parent = currentParent;
            currentParent.children.push(node);
        }
    }

    function chars(text) {
        text = text.replace(/\s/g,"");
        if(text) {
            currentParent.children.push({
                text,
                type: 3
            })
        }
    }

    function advance(n) {
        html = html.substring(n)
    }

    function parseStartTag() {
        let start = html.match(startTagOpen);
        if(start) {
            let match = {
                tagName: start[1],
                attrs: []
            }
            advance(start[0].length);

            let end, attr;
            while(!(end=html.match(startTagClose)) && (attr = html.match(attribute))) {
                match.attrs.push({
                    name: attr[1],
                    value: attr[3] || attr[4] || attr[5] || true
                })
                advance(attr[0].length)
            }
            if(end) {
                advance(end[0].length)
                return match
            }
            
        }

    }

    while(html) {
        let textEnd = html.indexOf("<");
        if(textEnd == 0) {//标签
            let startTagMatch = parseStartTag();
            if(startTagMatch) {
                start(startTagMatch.tagName, startTagMatch.attrs)
                continue
            }

            let endTagMatch = html.match(endTag);
            if(endTagMatch) {
                advance(endTagMatch[0].length);
                end(endTagMatch[1]);
                continue;
            }


        }
        if(textEnd > 0) {//文本
            let text = html.substring(0, textEnd);
            advance(text.length);
            chars(text);
        }
    }
    return root;
}