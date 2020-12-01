import './static/index.css'
import './static/less.less'
import './static/sass.scss'

let title = require("./static/title.txt");
let titleElem = document.createElement("h1");
titleElem.innerHTML = title.default;
document.body.appendChild(titleElem);


let logo = require("./static/logo.png");
let imgElem = document.createElement("img");
// imgElem.src = logo.default; //esModule: true
imgElem.src = logo;//esModule: false
document.body.appendChild(imgElem);
