// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Register from '../views/Register.vue';
import Login from '../views/Login.vue';
import Profile from '../views/Profile.vue';
import CreateTopic from '../views/CreateTopic.vue';

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
        path: '/:username',
        name: 'Profile',
        component: Profile,
    },
    {
        path:'/create-topic',
        name:'CreateTopic',
        component: CreateTopic,
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
