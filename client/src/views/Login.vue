<!-- src/views/Login.vue -->
<template>
    <div>
        <h1>Login Page</h1>
        <form @submit.prevent="loginUser">
            <label for="username">Username:</label>
            <input type="text" id="username" v-model="username" required /><br>

            <label for="password">Password:</label>
            <input type="password" id="password" v-model="password" required /><br>

            <!-- Message d'erreur -->
            <p v-if="error" class="error">{{ error }}</p>

            <button type="submit">Login</button>
        </form>
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
