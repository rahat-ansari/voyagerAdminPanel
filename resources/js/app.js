/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

Vue.use(iView, {locale});
locale(lang);

import iView from 'iview';
import {locale, Page} from 'iview';
//Vue.component('DropdownMenu ', DropdownMenu );
import lang from 'iview/dist/locale/en-US';

Vue.use(VueAxios, axios)
import VueAxios from 'vue-axios'


/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i);
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default));

Vue.component('example-component', require('./components/ExampleComponent.vue').default);
import Login from "./components/Login";
import Register from "./components/Register";
import UserHome from "./components/UserHome";


const routes = [{
    path: '/user/login',
    name: 'Login',
    component: Login
},
    {
        path: '/user/register',
        name: 'Register',
        component: Register
    },
    // {
    //     path: '/admin',
    //     name: 'UserHome',
    //     component: UserHome
    // },
]
const router = new VueRouter({
    mode: 'history',
    routes,
    /* scrollBehavior () {
         return { x: 0, y: 0 }
     }*/

})
/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
    el: '#app',
    router,
    components: {
        Login,
        Register,
       // UserHome,


    },

    created() {
        console.log('Working Sir!');
    },

});
