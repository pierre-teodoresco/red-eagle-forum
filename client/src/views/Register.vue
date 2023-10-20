<!-- src/views/Register.vue -->
<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div class="max-w-md w-full space-y-8">
            <div>
                <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Register
                </h2>
            </div>
            <form class="mt-8 space-y-6" @submit.prevent="registerUser">
                <input type="hidden" name="remember" value="true">
                <div class="rounded-md shadow-sm -space-y-px">
                    <div>
                        <label for="username" class="sr-only">Username</label>
                        <input id="username" name="username" type="text" v-model="username" autocomplete="username" required
                            class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Username">
                    </div>
                    <div>
                        <label for="password" class="sr-only">Password</label>
                        <input id="password" name="password" type="password" v-model="password"
                            autocomplete="current-password" required
                            class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Password">
                    </div>
                </div>

                <div v-if="error" class="text-red-500 text-sm mt-2">
                    {{ error }}
                </div>

                <div class="text-sm text-center">
                    <router-link to="/login" class="font-medium text-indigo-600 hover:text-indigo-500">
                        Already have an account? Login here.
                    </router-link>
                </div>

                <div>
                    <button type="submit"
                        class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                            <!-- Heroicon name: solid/lock-closed -->
                            <svg class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                aria-hidden="true">
                                <path fill-rule="evenodd"
                                    d="M10 2a3 3 0 00-3 3v2H4a2 2 0 00-2 2v9a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-3V5a3 3 0 00-3-3zM7 5v2h6V5a1 1 0 00-1-1H8a1 1 0 00-1 1zm6 10H7v-3h6v3z"
                                    clip-rule="evenodd" />
                            </svg>
                        </span>
                        Register
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<!-- src/views/Register.vue -->
<script>
import Cookies from 'js-cookie';

export default {
    data() {
        return {
            username: '',   // User's username
            password: '',   // User's password
            error: null,    // Error message from the server
        };
    },
    methods: {
        async registerUser() {
            const username = this.username.trim();
            const password = this.password.trim();
            try {
                // Send the POST request with username and password to the backend
                const response = await fetch('/user/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username,
                        password,
                    }),
                });

                const responseData = await response.json();

                // Check if the request was successful
                if (!response.ok) {
                    // Throw an error with the message from the backend
                    throw new Error(responseData.error || 'Registration failed');
                }

                // Redirect to the Home view on success
                this.$router.push('/');

            } catch (error) {
                console.error('Error during registration:', error);
                this.error = error.message;
            } finally {
                // Clear the form
                this.username = '';
                this.password = '';
            }
        },
    },
};
</script>
