import {createRouter, createWebHashHistory, createWebHistory} from 'vue-router'
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import Login from "@/components/Login.vue";
import Main from "@/components/Main.vue";
import axios from 'axios'
import qs from 'qs'
import Login1 from "@/components/Login1.vue";
import Main1 from "@/components/Main1.vue";
import Main2 from "@/components/Main2.vue";
import shopOffice from "@/components/shopOffice.vue";
import Login2 from "@/components/Login2.vue";




const routes = [
    { path: '/0', component: Login },
    { path: '/0/main', component: Main },
    { path: '/1',component: Login1},
    { path: '/1/main',component: Main1},
    { path: '/2/main',component: Main2},
    { path: '/2/office',component: shopOffice},
    { path: '/2',component: Login2},
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

const app = createApp(App)
app.provide("$axios",axios);
app.provide("$qs",qs);
app.use(router)
app.use(ElementPlus)
app.mount('#app')




