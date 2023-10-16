<!-- src/views/Home.vue -->
<template>
    <div>
        <h1>Home Page</h1>

        <!-- Afficher le nom de l'utilisateur si connecté -->
        <div v-if="user">
            <p>Bienvenue, {{ user.username }}!</p>
        </div>

        <!-- Liens vers d'autres pages -->
        <router-link to="/register">Aller vers l'inscription</router-link>
        <br>
        <router-link to="/login">Aller vers la connexion</router-link>
    </div>
</template>

<script>
export default {
    computed: {
        user() {
            // Accéder à l'utilisateur depuis le store
            return this.$store.getters.getUser;
        },
    },
};
</script>
