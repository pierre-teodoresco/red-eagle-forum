<!-- src/components/Header.vue -->
<template>
    <header class="bg-indigo-600 p-4">
        <div class="container mx-auto flex items-center justify-between">
            <div class="flex items-center">
                <img src="#" alt="" class="h-8 w-8 mr-2">
                <h1 class="text-white text-lg font-semibold">{{ forumName }}</h1>
            </div>
            <nav class="space-x-4">
                <router-link to="/" class="text-white hover:text-gray-300">Home</router-link>
                <!-- Ajoute d'autres liens de navigation selon tes besoins -->
            </nav>
            <div class="flex items-center">
                <div v-if="user" class="text-white space-x-4">
                    <span>{{ user.username }}</span>
                    <button @click="logout" class="text-white hover:text-gray-300">
                        Logout
                    </button>
                </div>
                <div v-else class="space-x-4">
                    <router-link to="/login" class="text-white hover:text-gray-300">Login</router-link>
                    <router-link to="/register" class="text-white hover:text-gray-300">Register</router-link>
                </div>
            </div>
        </div>
    </header>
</template>
  
<script>
import Cookie from 'js-cookie'

export default {
    props: {
        forumName: String, // Pass the forum name as a prop
        user: Object,      // Pass the user object as a prop
    },
    methods: {
        async logout() {
            try {
                // Send a request to the server to logout the user
                const response = await fetch('/api/logout', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                const responseData = await response.json();

                if (!response.ok) {
                    // Handle server errors or other issues
                    throw new Error(responseData.message || 'Internal server error');
                } else {
                    // Remove the token from the cookie
                    Cookie.remove('sessionToken');
                }

            } catch (error) {
                console.error('Error logging out: ', error);
                throw error;
            }

            // Refresh the page
            this.$router.go();
        },
    },
};
</script>
  