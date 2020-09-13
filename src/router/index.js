import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import PageNotFound from '../views/404.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import Verify from '../views/Auth/Verify.vue';
import Init from "../views/Init.vue";
import Chat from "../components/Chat/Index.vue"
import NoChat from "../components/Chat/NoChat.vue";
Vue.use(VueRouter)

  const routes = [
  {
    path:"/",
    name:"Init",
    "component":Init,
    
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta:{
      guest:true
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta:{
      guest:true
    }
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta:{
      auth:true
    },
    children:[
      {name:'noChat',path:"",component:NoChat},
      {name:'chat',path:":id",component:Chat}
    ]
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/verify-email',
    name: 'verify',
    component: Verify,
    meta:{
      guest:true
    }
  },
  {
    // will match everything
    path: '*',
    component:PageNotFound,
    name:"404"
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})



export default router
