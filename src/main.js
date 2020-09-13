require("./bootstrap");
import Vue from "vue";
import Vuex from "vuex";
import App from "./App.vue";
import router from "./router";
import Vuelidate from "vuelidate";
import storeData from "./store/index";
import VueSocketIO from 'vue-socket.io'

// import openSocket from "socket.io-client";
// import { socket } from "./bootstrap"
// const {init,socket} =require("./socket")
Vue.use(Vuelidate);


Vue.config.productionTip = false;
Vue.use(Vuex);
    router.beforeEach((to, from, next) => {
        if (to.matched.some((record) => record.meta.auth)) {
            if (!store.getters.isLoggedIn) {
                next({path: "/"});
            } 
            else {
                next();
            }
        } 
        else if (to.matched.some((record) => record.meta.guest)) {
            if (store.getters.isLoggedIn) {
                next({
                    path: "/home",
                });
            } 
            else {
                next();
            }
        } 
        else {
            next(); // make sure to always call next()!
        }
    });
const store = new Vuex.Store(storeData);
Vue.use(new VueSocketIO({
    debug: true,
    connection: 'http://localhost:8000/',
    vuex: {
        store,
        actionPrefix: 'SOCKET_',
        mutationPrefix: 'SOCKET_'
    }
}));

new Vue({
  router,
  store,
  render: (h) => h(App),
  computed:{
    authuser(){
        return this.$store.getters.user;
    }  
  },
  created(){
    
    
  }
}).$mount("#app");
export const eventBus = new Vue();
