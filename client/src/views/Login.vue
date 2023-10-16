<!-- src/views/Login.vue -->
<!-- src/views/Login.vue -->
<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div class="max-w-md w-full space-y-8">
        <div>
            <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Login
            </h2>
        </div>
        <form class="mt-8 space-y-6" @submit.prevent="loginUser">
            <input type="hidden" name="remember" value="true">
            <div class="rounded-md shadow-sm -space-y-px">
            <div>
                <label for="username" class="sr-only">Username</label>
                <input id="username" name="username" type="text" v-model="username" autocomplete="username" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Username">
            </div>
            <div>
                <label for="password" class="sr-only">Password</label>
                <input id="password" name="password" type="password" v-model="password" autocomplete="current-password" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password">
            </div>
            </div>

            <div class="flex items-center justify-between">
            <div class="flex items-center">
                <input id="remember_me" name="remember_me" type="checkbox" class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded">
                <label for="remember_me" class="ml-2 block text-sm text-gray-900">
                Remember me
                </label>
            </div>

            <div class="text-sm">
                <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">
                Forgot your password?
                </a>
            </div>
            </div>

            <div>
            <button type="submit" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                <!-- Heroicon name: solid/lock-closed -->
                <svg class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M10 2a3 3 0 00-3 3v2H4a2 2 0 00-2 2v9a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-3V5a3 3 0 00-3-3zM7 5v2h6V5a1 1 0 00-1-1H8a1 1 0 00-1 1zm6 10H7v-3h6v3z" clip-rule="evenodd" />
                </svg>
                </span>
                Login
            </button>
            </div>
        </form>
        </div>
    </div>
</template>

<!-- src/views/Login.vue -->
<script>
export default {
    data() {
        return {
            username: '',
            password: '',
            error: null, // Propriété pour stocker les erreurs
        };
    },
    methods: {
        async loginUser() {
            console.log("login submit");

            try {
                // Construction de l'URL avec les paramètres username et password
                const uri = `/api/user?username=${this.username}&password=${this.password}`;

                // Envoi de la requête GET au backend
                const response = await fetch(uri, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                // Vérification de la réussite de la requête
                if (!response.ok) {
                    // Tentative de récupération du message d'erreur depuis le corps de la réponse
                    const responseData = await response.json();
                    throw new Error(responseData.message || 'Login failed');
                }

                console.log('User logged successfully');

                // Redirection vers la vue Home en cas de succès
                this.$router.push('/');

            } catch (error) {
                console.error('Error during login:', error);

                // Affichage du message d'erreur
                this.error = error.message;
            } finally {
                // Réinitialisation des champs du formulaire
                this.username = '';
                this.password = '';
            }
        },
    },
};
</script>
