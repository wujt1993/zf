function loader(source) {
    console.log('inline-2');
    return source + "//inline-2";
}

module.exports = loader;