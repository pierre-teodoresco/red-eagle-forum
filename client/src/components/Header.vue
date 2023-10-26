<!-- src/components/Header.vue -->
<template>
    <header class="bg-indigo-600 p-4">
        <div class="container mx-auto flex items-center justify-between">
            <div class="flex items-center">
                <img src="../../img/RedEagleIcon.png" alt="" class="h-15 w-12 mr-2">
                <router-link to="/" class="text-white text-lg font-semibold hover:text-gray-300">Red Eagle Forum</router-link>
            </div>
            <nav class="space-x-4">
                <!-- Add other links -->
            </nav>
            <div class="flex items-center">
                <div v-if="user" class="text-white space-x-4">
                    <router-link :to="`/profile/${user.username}`" class="text-white hover:text-gray-300">{{ user.username }}</router-link>
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
export default {
    props: {
        user: Object,      // Pass the user object as a prop
    },
    methods: {
        async logout() {
            try {
                // Send a request to the server to logout the user
                const response = await fetch('/user/logout', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                const responseData = await response.json();

                if (!response.ok) {
                    // Handle server errors or other issues
                    throw new Error(responseData.error || 'Internal server error');
                }

            } catch (error) {
                console.error('Error logging out: ', error);
            }

            // Refresh the page
            if (!this.$router.currentRoute.path === '/') {
                this.$router.push('/');  
            } 

            this.$router.go();
        },
    },
};
</script>
  