
const less = require("less");
function loader(content) {
    let callback = this.async();
    less.render(content,{filename: this.resource}, (err,output)=>{
        callback(err,output.css);
    })
}

module.exports = loader;