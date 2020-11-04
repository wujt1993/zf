export function forEachVal(obj, cb) {
    Object.keys(obj).forEach(key => {
        cb(obj[key], key)
    })
}