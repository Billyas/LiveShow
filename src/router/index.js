// history模式
import {
    createRouter,
    createWebHashHistory,
} from 'vue-router'

import Live from '@/components/Live.vue'
import test from "@/components/test.vue";
import Main from "@/components/Main.vue";
import Sub from "@/components/Sub.vue";
import Index from "@/components/Index.vue"
import Tik from "@/components/Tik.vue"
const routes = [
// 路由的默认路径

    {
        path:'/',
        component: Index
    },{
        path: '/sub',
        component: Sub
    },
    {
        path: '/main',
        component: Main
    },
    {
      path: '/live',
      component: Live
    },
    {
        path: '/play',
        component: Live
    },
    {
        path: '/test',
        component: test
    },
    {
        path: '/tik',
        component: Tik
    }
]

// 创建路由对象
const router = createRouter({
    history: createWebHashHistory(),
    routes
})
export default router;
