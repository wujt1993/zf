

function loader(content) {
    return `
        let style = document.createElement('style');
        style.innerHTML = ${JSON.stringify(content)};
        document.head.appendChild(style);
    `
}

module.exports = loader;