<!-- src/views/Home.vue -->
<template>
    <div>
        <Header :forumName="forumName" :user="user"/>

        <h2>Welcome to {{ forumName }}</h2>
    </div>
</template>

<script>
import Header from '../components/Header.vue';
import Cookies from 'js-cookie';
import Service from '../services'

export default {
    components: {
        Header,
    },
    data() {
        return {
            forumName: 'Red Eagle Forum', // Forum name
            user: null,                     // User's username
        }
    },
    mounted() {
        // Check if the token is already stored in cookies
        const sessionToken = Cookies.get('sessionToken');
        if (sessionToken) {
            // Check the validity of the token by sending a request to the server
            Service.checkSessionTokenValidity(sessionToken)
                .then((data) => {
                    if (data.isValid) {
                        // Redirect to the Home view
                        this.user = data.user;
                    } else {
                        // Token is not valid, you may want to handle this case
                        // For example, clear the token from cookies and show a login form
                        Cookies.remove('sessionToken');
                    }
                })
                .catch((error) => {
                    console.error('Error checking token validity:', error);
                });
        }
    },
};
</script>
