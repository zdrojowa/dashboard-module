import Vue from 'vue'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import VueRouter from 'vue-router'
import routes from './components/routes'

window.axios = require('axios');

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.use(VueRouter)

const app = document.getElementById('app');

new Vue({
    components: {routes}
}).$mount(app);