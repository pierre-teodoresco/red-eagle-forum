<!-- src/views/Home.vue -->
<template>
    <div>
        <Header :forumName="forumName" :user="user"/>
    </div>
</template>

<script>
import Header from '../components/Header.vue';
import Cookies from 'js-cookie';
import Service from '../services'

export default {
    components: {
        Header,
    },
    data() {
        return {
            forumName: 'Red Eagle Forum', // Forum name
            user: null,                   // User's username
        }
    },
    async mounted() {
        try {
            // Check if the user is logged in
            const data = await Service.isLoggedIn();
            console.log(data);
            this.user = data.user;
        } catch (error) {
            console.log(error);
        }
    },
};
</script>
