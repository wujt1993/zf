function loader(source) {
    console.log("logger-1",'--------------', JSON.stringify(source));
    return source;
}

module.exports = loader;