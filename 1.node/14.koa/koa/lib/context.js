let proto =  {
  
}
module.exports = proto;
// proto和ctx的关系  
// ctx.__proto__.__proto__ = proto

function defineGetter(target,key){
    proto.__defineGetter__(key,function () { // defineProperty
        return this[target][key]
    })
}
function defineSetter(target,key){
    proto.__defineSetter__(key,function (value) { 
        this[target][key] = value; //ctx.body = 'xxx' ctx.respinse.body = 'xxx'
    })
}
// 代理实现 ctx.xxx = ctx.request.xxx   ctx.xxx = ctx.response.xxx
defineGetter('request','path');
defineGetter('request','url');
defineGetter('response','body');
defineSetter('response','body');