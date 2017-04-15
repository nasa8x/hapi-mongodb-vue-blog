import Css from './css/layout.css'

import Vue from 'vue'
import App from './app.vue'
import store from './store'
import router from './router'
import { sync } from 'vuex-router-sync'
// import Cookie from 'vue-cookie'

// import Validate from 'vee-validate'
import NProgress from 'vue-nprogress'

import Bootstrap from 'bootstrap'

// sync the router with the vuex store.
// this registers `store.state.route`
sync(store, router);


// Vue.use(Cookie);

// Vue.use(Validate);

Vue.use(NProgress, {
    //latencyThreshold: 200, // Number of ms before progressbar starts showing, default: 100,
    router: true, // Show progressbar when navigating routes, default: true
    http: true // Show progressbar when doing Vue.http, default: true
});


const nprogress = new NProgress({ parent: '.nprogress-container' });

// create the app instance.
// here we inject the router and store to all child components,
// making them available everywhere as `this.$router` and `this.$store`.
const app = new Vue({
  el: '#app',
  nprogress,
  router,
  store,
  render: h => h(App)
})

// expose the app, the router and the store.
// note we are not mounting the app here, since bootstrapping will be
// different depending on whether we are in a browser or on the server.
export { app, router, store }