<!-- src/views/Profile.vue -->
<template>
    <div>
        <Header :user="user" />
    </div>

    <div class="flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div class="max-w-md w-full space-y-8">
            <div>
                <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    User Profile
                </h2>
            </div>
            <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <!-- Form to Update User Information -->
                <form @submit.prevent="updateUser">
                    <div class="mb-4">
                        <label for="username" class="block text-gray-700 text-sm font-bold mb-2">
                            Username
                        </label>
                        <input id="username" name="username" type="text" v-model="user.username" autocomplete="username" readonly
                            class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Username">
                    </div>

                    <div class="mb-4">
                        <label for="email" class="block text-gray-700 text-sm font-bold mb-2">
                            E-mail
                        </label>
                        <input id="email" name="email" type="text" v-model="user.email" autocomplete="email"
                            class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="E-mail">
                    </div>

                    <div class="mb-4">
                        <label for="name" class="block text-gray-700 text-sm font-bold mb-2">
                            Name
                        </label>
                        <input id="name" name="name" type="text" v-model="user.name" autocomplete="name"
                            class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Name">
                    </div>

                    <div class="mb-4">
                        <label for="surname" class="block text-gray-700 text-sm font-bold mb-2">
                            Surname
                        </label>
                        <input id="surname" name="surname" type="text" v-model="user.surname" autocomplete="surname"
                            class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Surname">
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
                            Update information
                        </button>
                    </div>
                </form>
            </div>
        </div>
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
            user: {
                username: '',
                email: '',
                name: '',
                surname: '',
            },
        };
    },
    methods: {
        async updateUser() {
            const user = this.user;
            try {
                // Send a request to the server to update the user's information
                const response = await fetch(`/user/update/${user.username}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: user.email,
                        name: user.name,
                        surname: user.surname,
                    }),
                });

                const responseData = await response.json();

                if (!response.ok) {
                    // Handle server errors or other issues
                    throw new Error(responseData.error || 'Internal server error');
                }

                // Refresh the page
                this.$router.go();
            } catch (error) {
                console.error('Error updating user information: ', error);
            }
        },
    },
    async mounted() {
        try {
            // Check if the user is logged in
            const data = await Service.isLoggedIn();

            if (!data.isLoggedIn) {
                this.$router.push('/login');
                return;
            }

            this.user = data.user;
        } catch (error) {
            console.log(error);
        }
    },
};
</script>
  
<style scoped>
.input-field {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 0.25rem;
}

.btn-primary {
    background-color: #4caf50;
    color: white;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 0.25rem;
    cursor: pointer;
}
</style>
  