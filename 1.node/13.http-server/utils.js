exports.forEach = function(obj, db) {
    Object.entries(obj).forEach(([key, value])=>{
        db(value, key)
    })
}