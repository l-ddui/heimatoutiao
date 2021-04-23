// 进行项目的路由模块的封装
//  模块化
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import { Toast } from 'vant';

// 创建路由模块
const router = new VueRouter({
    routes: [
        {
            path: '/',
            redirect: { name: 'index' }
        },
        {
            name: 'index',
            path: '/index',
            component: () => import('@/views/index.vue')
        },
        {
            name: 'login',
            path: '/login',
            component: () => import('@/views/user/login.vue')
        },
        {
            name: 'register',
            path: '/register',
            component: () => import('@/views/user/register.vue')
        },
        {
            name: 'personal',
            path: '/personal/:id',
            component: () => import('@/views/user/personal.vue')
        },
        {
            name: 'edit_profile',
            path: '/edit_profile/:id',
            component: () => import('@/views/user/edit_profile.vue')
        },
    ]
})

// 导航守卫
router.beforeEach((to, from, next) => {
    if (to.path.indexOf('/personal/') != -1) {
        let token = localStorage.getItem('heimatoutiaoToken')
        if (token) {
            next()
        } else {
            Toast.fail({
                message: '未登录，请先登录',
                icon: "warning-o",
            });
            next({ name: 'login' })
        }
    }
    next()
})

// 暴露
export default router