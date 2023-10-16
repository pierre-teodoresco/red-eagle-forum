<!-- src/views/Register.vue -->
<template>
    <div>
        <h1>Register Page</h1>
        <form @submit.prevent="registerUser">
            <label for="username">Username:</label>
            <input type="text" id="username" v-model="username" required /><br>

            <label for="password">Password:</label>
            <input type="password" id="password" v-model="password" required /><br>

            <button type="submit">Register</button>
        </form>
    </div>
</template>

<!-- src/views/Register.vue -->
<script>
export default {
    data() {
        return {
            username: '',
            password: '',
        };
    },
    methods: {
        async registerUser() {
            console.log("register submit");
            try {
                // Envoi de la requête POST au backend avec les données d'inscription
                const response = await fetch('/api/user', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username: this.username,
                        password: this.password,
                    }),
                });

                // Vérification de la réussite de la requête
                if (!response.ok) {
                    // Tentative de récupération du message d'erreur depuis le corps de la réponse
                    const responseData = await response.json();
                    throw new Error(responseData.message || 'Registration failed');
                }

                console.log('User registered successfully');

                // Redirection vers la vue Home en cas de succès
                this.$router.push('/');

            } catch (error) {
                console.error('Error during registration:', error);

            } finally {
                // Réinitialisation des champs du formulaire
                this.username = '';
                this.password = '';
            }
        },
    },
};
</script>
