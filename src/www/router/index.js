import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Login from '../views/member/login.vue'
import Register from '../views/member/register.vue'
import ForgetPwd from '../views/member/forgetpwd.vue'

import P404 from '../views/404.vue'
import Detail from '../views/post/detail.vue'
import List from '../views/post/list.vue'

const router = new Router({
    mode: 'history',
    scrollBehavior: () => ({ y: 0 }),
    routes: [
        { path: '/p/:id', name: 'post-detail', component: Detail },
        { path: '/p/:id/:slug', name: 'post-detail-slug', component: Detail },
        { path: '/:slug?', component: List },
        { path: '/search/:kwd?', component: List },
        { path: '/register', component: Register },
        { path: '/login', component: Login },
        { path: '*', component: P404 }
    ]
});


router.beforeEach((to, from, next) => {
    if (to.meta.auth && !localStorage.getItem("auth")) {
        next({
            path: '/login',
            query: { next: to.fullPath }
        })
    } else {
        next()
    }
});

export default router