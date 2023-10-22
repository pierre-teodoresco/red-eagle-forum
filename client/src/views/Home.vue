<!-- src/views/Home.vue -->
<template>
    <div>
        <Header :forumName="forumName" :user="user" />
    </div>
    <!-- Affichez la liste de tous les topics dispo dans la bd -->
    <div>
        <!--Utiliser la méthode getAllTopics() pour afficher dans la page tous les topics-->
        

    </div>
    <div>
        <!-- Affichez le bouton "Créer un Topic" si l'utilisateur est connecté -->
        <div class="h-screen flex flex-col justify-center items-center">
            <router-link v-if="user" to="/create-topic"
                class="group relative w-50 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <span class="flex items-center">
                    Créer un nouveau topic
                    <svg class="h-5 w-5 text-blue-500 group-hover:text-blue-400 ml-2" xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd"
                            d="M10 2a3 3 0 00-3 3v2H4a2 2 0 00-2 2v9a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-3V5a3 3 0 00-3-3zM7 5v2h6V5a1 1 0 00-1-1H8a1 1 0 00-1 1zm6 10H7v-3h6v3z"
                            clip-rule="evenodd" />
                    </svg>
                </span>
            </router-link>
        </div>
    </div>
</template>

<script>
import Header from '../components/Header.vue';
import UserServices from '../services/UserServices.js'

export default {
    components: {
        Header,
    },
    data() {
        return {
            pageName: 'Home',             // Name of the current page
            user: null,                   // User's username
        }
    },
    async mounted() {
        try {
            // Check if the user is logged in
            const data = await UserServices.isLoggedIn();
            this.user = data.user;

            // A l'initialisation de la page
            // Faire requête GET pour avoir tous les topics dans la bd + les afficher dans la page
            this.getAllTopics();

        } catch (error) {
            console.log(error);
        }
    },
    methods: {
        // Requête bd pour avoir tous les topics
        async getAllTopics() {
            try {
                // A faire 

            } catch (error) {
                console.log(error);
            }
        }
    }
};
</script>
