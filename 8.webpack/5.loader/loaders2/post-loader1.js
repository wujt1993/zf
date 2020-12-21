function loader(source) {
    console.log('post-1');
    return source + "//post-1";
}

module.exports = loader;