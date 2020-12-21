
const loaderUtils = require("loader-utils");
const postcss = require("postcss");
const Tokenizer = require("css-selector-tokenizer")
function loader(inputSource) {

    let loaderOptions = loaderUtils.getOptions(this);
    let callback = this.async()
    const cssPlugin = (options) => {
        return (root, result) => {
            if (loaderOptions.import) {
                root.walkAtRules(/^import$/i, rule => {
                    rule.remove();
                    options.imports.push(rule.params.slice(1, -1));
                })
            }
            root.walkDecls((decl) => {
                var values = Tokenizer.parseValues(decl.value);
                values.nodes.forEach(function (value) {
                    value.nodes.forEach((item) => {
                        if (item.type === "url") {
                            let url = loaderUtils.stringifyRequest(this, item.url);
                            item.stringType = "'";
                            item.url = "`+require(" + url + ")+`";
                        }
                    });
                });
                let value = Tokenizer.stringifyValues(values);
                decl.value = value;
            });
        }
    }

    let options = { imports: [] };
    let pipeline = postcss([cssPlugin(options)]);
    pipeline.process(inputSource).then(result => {
        let { importLoaders = 0 } = loaderOptions;
        let { loaders, loaderIndex } = this;
        let loadersRequest = loaders.slice(loaderIndex, loaderIndex + 1 + importLoaders).map(x => x.request).join("!");
        let importCss = options.imports.map((url) => {
            return `list.push(...require(` + loaderUtils.stringifyRequest(this, `-!${loadersRequest}!${url}`) + `));`
        }).join("\r\n");
        let script = `
            var list = [];
            list.toString = function(){return this.join('')}
            ${importCss}
            list.push(\`${result.css}\`);
            module.exports = list;
        `;
        callback(null, script);
    })
}

module.exports = loader;