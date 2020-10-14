let proto =  {
  
}
module.exports = proto;

function defineGetter(target, key) {
    proto.__defineGetter__(key, function() {
        return this[target][key]
    })
}

function defineSetter(target, key) {
    proto.__defineSetter__(key, function(val) {
        this[target][key] = val;
    })
}

defineGetter("request", "path")
defineGetter("request", "query")


defineGetter("response", "body")
defineSetter("response", "body")