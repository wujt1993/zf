import Vue from 'vue';
import App from './App.vue';


export default () => {
    const app = new Vue({
        el: '#app',
        render: h => h(App)
    });
    return {app}
}