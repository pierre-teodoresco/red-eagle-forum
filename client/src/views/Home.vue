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
import Service from './service';

export default {
    computed: {
        user() {
            // Check if the token is already stored in cookies
            const sessionToken = Cookies.get('sessionToken');
            if (sessionToken) {
                // Check the validity of the token by sending a request to the server
                Service.checkSessionTokenValidity(sessionToken)
                    .then((data) => {
                        if (data.isValid) {
                            // Redirect to the Home view
                            return data.user;
                        } else {
                            // Token is not valid, you may want to handle this case
                            // For example, clear the token from cookies and show a login form
                            Cookies.remove('sessionToken');
                        }
                    })
                    .catch((error) => {
                        console.error('Error checking token validity:', error);
                    });

                // Redirect to the Home view
                this.$router.push('/');
            }
        },
    },
};
</script>
