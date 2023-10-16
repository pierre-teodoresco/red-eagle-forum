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

                if (!response.ok) {
                    throw new Error('Registration failed');
                }

                console.log('User registered successfully');

                // Redirection vers la vue Home en cas de succès
                this.$router.push('/');

            } catch (error) {
                console.error('Error during registration:', error);

            } finally {
                // Reset form fields
                this.username = '';
                this.password = '';
            }
        },
    },
};
</script>

