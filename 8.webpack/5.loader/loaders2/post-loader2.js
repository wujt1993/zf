function loader(source) {
    console.log('post-2');
    return source + "//post-2";
}

module.exports = loader;