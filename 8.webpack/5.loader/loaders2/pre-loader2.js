function loader(source) {
    console.log('pre-2');
    return source + "//pre-2";
}

module.exports = loader;