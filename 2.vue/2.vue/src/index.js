import { compileToFunctions } from "./complier/index";
import { initGlobalAPI } from "./global-api/index";
import { initMixin } from "./init";
import { lifecycleMixin } from "./lifecycle";
import { renderMixin } from "./render";
import { createElm, patch} from "./vdom/patch";


function Vue(options) {
    this._init(options)
}

initMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

initGlobalAPI(Vue);


let vm1 = new Vue({
    data() {
        return {
            name: 'zf'
        }
    }
})

let render1 = compileToFunctions(`<ul style='font-size: 20px' a=1>
    <li key="A">A</li>
    <li key="B">B</li>
    <li key="C">C</li>
    <li key="D">D</li>
    
</ul>`);
let oldVnode = render1.call(vm1);
let el = createElm(oldVnode);
document.body.appendChild(el);


let vm2 = new Vue({
    data() {
        return {
            name: 'kinth'
        }
    }
})

let render2 = compileToFunctions(`<ul style='color: red' b=2>
<li key="E">E</li>
<li key="A">A</li>
<li key="B">B</li>
<li key="C">C</li>
<li key="D">D</li>

</ul>`);
let newVnode = render2.call(vm2);
setTimeout(() => {
    patch(oldVnode, newVnode); //  包括了初渲染和diff算法的流程
}, 2000);

export default Vue;