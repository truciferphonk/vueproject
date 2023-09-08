import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import { LayoutPlugin } from 'bootstrap-vue'
Vue.use(LayoutPlugin)

import { ModalPlugin } from 'bootstrap-vue'
Vue.use(ModalPlugin)

import { CardPlugin } from 'bootstrap-vue'
Vue.use(CardPlugin)

import { VBScrollspyPlugin } from 'bootstrap-vue'
Vue.use(VBScrollspyPlugin)

import { DropdownPlugin, TablePlugin } from 'bootstrap-vue'
Vue.use(DropdownPlugin)
Vue.use(TablePlugin)

import roleDirectives from './roleDirectives'
Vue.directive("role", roleDirectives);

import Page1 from './components/pages/Page1.vue'
import Page2 from './components/pages/Page2.vue'
import Page3 from './components/pages/Page3.vue'
import Page4 from './components/pages/Page4.vue'
import SingleGame from './components/pages/SingleGame.vue'
import Login from './components/pages/LogIn.vue'
import Admin from './components/pages/Admin.vue'
import Register from './components/pages/Register.vue'
import store from './store.js';


Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)


var routes = [
  { path: "/page1", component: Page1 },
  { path: "/page2", component: Page2 },
  { path: "/page3", component: Page3 },
  { path: "/page4", component: Page4 },
  { path:'/page5', component: SingleGame },
  { path:'/admin', component: Admin },
  { path:'/login', component: Login },
  { path:'/register', component: Register }
]

var router = new VueRouter({routes})

Vue.prototype.$baseApiUrl = 'https://cheapshark-game-deals.p.rapidapi.com/'

Vue.use(VueRouter)

new Vue({
  router,
  store,
  created: function() {
    var user = localStorage.getItem("user")

    if(!user) {
      this.$store.commit("userChange", undefined)
      return
    }

    this.$store.commit("userChange", JSON.parse(user))
  },
  render: h => h(App),
}).$mount('#app')
