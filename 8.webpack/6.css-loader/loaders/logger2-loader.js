function loader(source) {
    console.log("logger-2",'--------------', JSON.stringify(source));
    return source;
}

module.exports = loader;