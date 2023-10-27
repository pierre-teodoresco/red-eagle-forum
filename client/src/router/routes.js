// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Register from '../views/Register.vue';
import Login from '../views/Login.vue';
import Profile from '../views/Profile.vue';
import CreateTopic from '../views/CreateTopic.vue';
import Topic from '../views/Topic.vue';
import PageNotFound from '../views/PageNotFound.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/register',
        name: 'Register',
        component: Register,
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
    },
    {
        path: '/profile/:username',
        name: 'Profile',
        component: Profile,
    },
    {
        path:'/create-topic',
        name:'CreateTopic',
        component: CreateTopic,
    },
    {
        path:'/feed/:label',
        name:'Topic',
        component: Topic,
    },
    {
        path: '/:catchAll(.*)',
        component: PageNotFound
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    base: '/',
});

export default router;
