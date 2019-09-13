//import Vue from "vue/types/vue";

window.$ = window.jQuery = require('jquery');
window.Laravel = {csrfToken: $('meta[name=csrf-token]').attr("content")};

window.Vue = require('vue');
import Vue from 'vue';

window.jQuery = window.$ = $ = require('jquery');

window.perfectScrollbar = require('perfect-scrollbar/jquery')($);
window.Cropper = require('cropperjs');
window.Cropper = 'default' in window.Cropper ? window.Cropper['default'] : window.Cropper;
window.toastr = require('toastr');
window.DataTable = require('datatables');
require('datatables-bootstrap3-plugin/media/js/datatables-bootstrap3');
window.SimpleMDE = require('simplemde');
require('dropzone');
require('jquery-match-height');
require('bootstrap-toggle');
require('nestable2');
require('bootstrap');
require('bootstrap-switch');
require('select2');
require('eonasdan-bootstrap-datetimepicker/src/js/bootstrap-datetimepicker');
var brace = require('brace');
require('brace/mode/json');
require('brace/theme/github');
require('./slugify');
window.TinyMCE = window.tinymce = require('tinymce');
require('./multilingual');
require('./voyager_tinymce');
require('./voyager_ace_editor');
window.helpers = require('./helpers.js');

import VueRouter from 'vue-router'

Vue.use(VueRouter)

Vue.use(iView, {locale});
locale(lang);

import iView from 'iview';
import {locale, Page} from 'iview';
//Vue.component('DropdownMenu ', DropdownMenu );
import lang from 'iview/dist/locale/en-US';
/*import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)*/


/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i);
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default));

//Vue.component('example-component', require('./components/ExampleComponent.vue').default);
Vue.component('admin-menu', require('./components/admin_menu.vue').default);
var ExampleComponent = Vue.component('example-component', require('./components/ExampleComponent.vue').default);
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
    {
        path: '/admin',
        name: 'UserHome',
        component: UserHome
    },
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
        UserHome,
        ExampleComponent

    },

    created() {
        console.log('Working Sir!');
    },

});



var admin_menu = new Vue({
    el: '#adminmenu',
});
/*const app = new Vue({
    el: '#app',
    components: {
        ExampleComponent: ExampleComponent
    }

});*/

$(document).ready(function () {

    var appContainer = $(".app-container"),
        fadedOverlay = $('.fadetoblack'),
        hamburger = $('.hamburger');

    $('.side-menu').perfectScrollbar();

    $('#voyager-loader').fadeOut();

    $(".hamburger, .navbar-expand-toggle").on('click', function () {
        appContainer.toggleClass("expanded");
        $(this).toggleClass('is-active');
        if ($(this).hasClass('is-active')) {
            window.localStorage.setItem('voyager.stickySidebar', true);
        } else {
            window.localStorage.setItem('voyager.stickySidebar', false);
        }
    });

    $('select.select2').select2({width: '100%'});
    $('select.select2-ajax').each(function() {
        $(this).select2({
            width: '100%',
            ajax: {
                url: $(this).data('get-items-route'),
                data: function (params) {
                    var query = {
                        search: params.term,
                        type: $(this).data('get-items-field'),
                        method: $(this).data('method'),
                        page: params.page || 1
                    }
                    return query;
                }
            }
        });

        $(this).on('select2:select',function(e){
            var data = e.params.data;
            $(e.currentTarget).find("option[value='" + data.id + "']").attr('selected','selected');;
        });

        $(this).on('select2:unselect',function(e){
            var data = e.params.data;
            $(e.currentTarget).find("option[value='" + data.id + "']").attr('selected',false);;
        });
    });
    $('select.select2-taggable').select2({
        width: '100%',
        tags: true,
        createTag: function(params) {
            var term = $.trim(params.term);

            if (term === '') {
                return null;
            }

            return {
                id: term,
                text: term,
                newTag: true
            }
        }
    }).on('select2:selecting', function(e) {
        var $el = $(this);
        var route = $el.data('route');
        var label = $el.data('label');
        var errorMessage = $el.data('error-message');
        var newTag = e.params.args.data.newTag;

        if (!newTag) return;

        $el.select2('close');

        $.post(route, {
            [label]: e.params.args.data.text,
        }).done(function(data) {
            var newOption = new Option(e.params.args.data.text, data.data.id, false, true);
            $el.append(newOption).trigger('change');
        }).fail(function(error) {
            toastr.error(errorMessage);
        });

        return false;
    });

    $('.match-height').matchHeight();

    $('.datatable').DataTable({
        "dom": '<"top"fl<"clear">>rt<"bottom"ip<"clear">>'
    });

    $(".side-menu .nav .dropdown").on('show.bs.collapse', function () {
        return $(".side-menu .nav .dropdown .collapse").collapse('hide');
    });

    $('.panel-collapse').on('hide.bs.collapse', function(e) {
        var target = $(e.target);
        if (!target.is('a')) {
            target = target.parent();
        }
        if (!target.hasClass('collapsed')) {
            return;
        }
        e.stopPropagation();
        e.preventDefault();
    });

    $(document).on('click', '.panel-heading a.panel-action[data-toggle="panel-collapse"]', function (e) {
        e.preventDefault();
        var $this = $(this);

        // Toggle Collapse
        if (!$this.hasClass('panel-collapsed')) {
            $this.parents('.panel').find('.panel-body').slideUp();
            $this.addClass('panel-collapsed');
            $this.removeClass('voyager-angle-up').addClass('voyager-angle-down');
        } else {
            $this.parents('.panel').find('.panel-body').slideDown();
            $this.removeClass('panel-collapsed');
            $this.removeClass('voyager-angle-down').addClass('voyager-angle-up');
        }
    });

    //Toggle fullscreen
    $(document).on('click', '.panel-heading a.panel-action[data-toggle="panel-fullscreen"]', function (e) {
        e.preventDefault();
        var $this = $(this);
        if (!$this.hasClass('voyager-resize-full')) {
            $this.removeClass('voyager-resize-small').addClass('voyager-resize-full');
        } else {
            $this.removeClass('voyager-resize-full').addClass('voyager-resize-small');
        }
        $this.closest('.panel').toggleClass('is-fullscreen');
    });

    $('.datepicker').datetimepicker();

    // Save shortcut
    $(document).keydown(function (e) {
        if ((e.metaKey || e.ctrlKey) && e.keyCode == 83) { /*ctrl+s or command+s*/
            $(".btn.save").click();
            e.preventDefault();
            return false;
        }
    });

    /********** MARKDOWN EDITOR **********/

    $('textarea.simplemde').each(function () {
        var simplemde = new SimpleMDE({
            element: this,
        });
        simplemde.render();
    });

    /********** END MARKDOWN EDITOR **********/

});
