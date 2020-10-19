const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z]*`; // aa-aa 
const qnameCapture = `((?:${ncname}\\:)?${ncname})`; //aa:aa
const startTagOpen = new RegExp(`^<${qnameCapture}`); // 可以匹配到标签名  [1]
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`); //[0] 标签的结束名字
//    style="xxx"   style='xxx'  style=xxx
const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
const startTagClose = /^\s*(\/?)>/;

/*
<div id="app">
    <div style="color: red">
        <span>{{ name }}</span>
    </div>
</div>
*/

function parseHTML(html) {

    function advance(n) {
        html = html.substring(n)
    }

    //获取开始标签
    function parseStartTag() {
        const start = html.match(startTagOpen);
        if(start) {
            let match = {
                tagName: start[1],
                attrs: []
            }
            // 截掉已匹配的部分
            advance(start[0].length);

            //获取该标签的属性, 当碰到 > 则为该标签结束位置
            let end, attr;
            while(!(end = html.match(startTagClose)) && (attr = html.match(attribute))){
                advance(attr[0].length)
                match.attrs.push({
                    name: attr[1],
                    value: attr[3] || attr[4] || attr[5] || true
                })

            }

            if(end) {
                advance(end[0].length);
                return match;
            }
            
            
           
        }

    }
    //不断截取html直到html为空
    while(html) {
        //获取标签开头 <
        let textEnd = html.indexOf('<');
        if(textEnd == 0) {
            //当 < 的位置为 0时，代表为标签
            //如果是开始标签
            let startTagMatch = parseStartTag();
            if(startTagMatch) {
                console.log('开始...',startTagMatch.tagName)
                continue;
            }

            let endTagMatch = html.match(endTag);
            if(endTagMatch) {
                console.log('结束...',endTagMatch[1])
                advance(endTagMatch[0].length);
                continue;
            }
        }
        let text;
        if(textEnd > 0) {
            text = html.substring(0, textEnd);
            advance(text.length);
            console.log("text...", text);
        }
    } 
}

export function compileToFunctions(template) {
    parseHTML(template)
}