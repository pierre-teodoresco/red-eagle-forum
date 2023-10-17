<!-- src/views/Home.vue -->
<template>
    <div>
        <h1>Home Page</h1>

        <!-- DEBUG: print "Welcome, <username>" when a user is logged in -->
        <div v-if="user">
            <p>Bienvenue, {{ user.username }}!</p>
        </div>

        <!-- DEBUG: router link to other views -->
        <router-link to="/register">Aller vers l'inscription</router-link>
        <br>
        <router-link to="/login">Aller vers la connexion</router-link>
    </div>
</template>

<script>
export default {
    computed: {
        user() {
            // Access to the user object from the Vuex store
            return this.$store.getters.getUser;
        },
    },
};
</script>
