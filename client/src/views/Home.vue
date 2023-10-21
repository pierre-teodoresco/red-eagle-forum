<!-- src/views/Home.vue -->
<template>
    <div>
        <Header :user="user" :currentPage="pageName" />
    </div>
</template>

<script>
import Header from '../components/Header.vue';
import Service from '../services'

export default {
    components: {
        Header,
    },
    data() {
        return {
            pageName: 'Home',             // Name of the current page
            user: null,                   // User's username
        }
    },
    async mounted() {
        try {
            // Check if the user is logged in
            const data = await Service.isLoggedIn();
            this.user = data.user;
        } catch (error) {
            console.log(error);
        }
    },
};
</script>
