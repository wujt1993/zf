function loader(source) {
    console.log('pre-1');
    return source + "//pre-1";
}
loader.pitch = function(remainingRequest, previousRequest, data) {
    console.log("pre-pitch-1")
}
module.exports = loader;