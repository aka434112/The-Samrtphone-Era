import Vue from 'vue'
import Router from 'vue-router'
import About from '@/components/About'
import Dashboard from '@/components/Dashboard'

Vue.use(Router)

export default new Router({
  mode: "history",
  routes: [
    {
      path: '/',
      name: 'InitialScreen',
      component: Dashboard
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: Dashboard
    },
	{
      path: "/about",
      name: "about",
      component: About
    },
  ]
})
