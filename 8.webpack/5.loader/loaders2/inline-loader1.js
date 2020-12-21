function loader(source) {
    console.log('inline-1');
    return source + "//inline-1";
}

loader.pitch = function(remainingRequest, previousRequest, data) {
    console.log("inline-pitch-1")
    console.log(remainingRequest)
    console.log(previousRequest)
    // return ''
}

module.exports = loader;