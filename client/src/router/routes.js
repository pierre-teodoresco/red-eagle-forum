// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Register from '../views/Register.vue';
import Login from '../views/Login.vue';
import Profile from '../views/Profile.vue';
import CreateTopic from '../views/CreateTopic.vue';
import Topic from '../views/Topic.vue';

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
        path:'/topic/feed/:label',
        name:'Topic',
        component: Topic,
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    base: '/',
});

export default router;
