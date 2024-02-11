// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: import('../views/Home.vue'),
    },
    {
        path: '/register',
        name: 'Register',
        component: import('../views/Register.vue'),
    },
    {
        path: '/login',
        name: 'Login',
        component: import('../views/Login.vue'),
    },
    {
        path: '/profile/:username',
        name: 'Profile',
        component: import('../views/Profile.vue'),
    },
    {
        path:'/create-topic',
        name:'CreateTopic',
        component: import('../views/CreateTopic.vue'),
    },
    {
        path:'/feed/:label',
        name:'Topic',
        component: import('../views/Topic.vue'),
    },
    {
        path: '/:catchAll(.*)',
        component: import('../views/PageNotFound.vue'),
    },
];

const router = createRouter({
    history: createWebHistory(),
    base: '/',
    routes,
});

export default router;
