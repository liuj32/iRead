import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: ()=> import("@/home")
    },         
    {
      path: '/wholeLabel',
      name: 'wholeLabel',
      component: ()=> import("@/components/search/WholeLabel")
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: ()=> import("@/components/search/Detail")
    },        
    {
      path: '/read/:id',
      name: 'read',
      component: ()=> import("@/components/read/Read")
    },      
    {
      path: '/history',
      name: 'history',
      component: ()=> import("@/components/bookStore/ReadHistory")
    },     
    {
      path: '/category',
      name: 'category',
      component: ()=> import("@/components/classification/Category")
    },      
    {
      path: '/ranking/',
      name: 'category',
      component: ()=> import("@/components/rank/Ranking")
    },     
  ]
})
