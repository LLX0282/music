import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import(  '../views/login.vue')
  },
  {
  path: '/',
  name: 'Home',
  component: () => import( '../components/Home.vue'),
  children: [
    {
      path: '/audioSystem',
      name: 'audioSystem',
      component: () => import(  '../views/audioSystem/audioSystem.vue'),
    },
    {
      path: '/comment',
      name: 'comment',
      component: () => import(  '../views/comment/comment.vue')
    },
    {
      path: '/classify',
      name: 'classify',
      component: () => import(  '../views/audioSystem/classify.vue')
    },
    {
      path: '/workDetails',
      name: 'workDetails',
      component: () => import( '../views/audioSystem/workDetails.vue')
    },
    {
      path: '/userSystem',
      name: 'userSystem',
      component: () => import( '../views/user/userSystem copy.vue')
    },
    {
      path: '/adminSystem',
      name: 'adminSystem',
      component: () => import(  '../views/adminSystem/adminSystem.vue')
    },
    {
      path: '/musicDetail',
      name: 'musicDetail',
      component: () => import(  '../views/audioSystem/musicDetail.vue')
    },
    {
      path: '/propellingMovement',
      name: 'propellingMovement',
      component: () => import(  '../views/propellingMovement/propellingMovement.vue')
    },
    {
      path: '/addAdmin',
      name: 'addAdmin',
      component: () => import(  '../views/adminSystem/addAdmin.vue')
    },
    {
      path: '/adminRecord',
      name: 'adminRecord',
      component: () => import(  '../views/record/record.vue')
    },
  ]
}, 
{
  path: '/increment',
  name: 'increment',
  component: () => import(  '../views/increment.vue')
},
{
  path: '/musicDetail',
  name: 'musicDetail',
  component: () => import(  '../views/audioSystem/musicDetail.vue')
},
]

const router = new VueRouter({
  mode: "history",
  routes,

})

export default router