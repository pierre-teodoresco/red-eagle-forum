<template>
    <div>
        <Header :user="user" :currentPage="pageName" />
    </div>
    <div class="flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div class="max-w-md w-full space-y-8">
            <div>
                <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Create Topic
                </h2>
            </div>
            <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <!-- Form to Update User Information -->
                <form @submit.prevent="createTopic">
                    <div class="mb-4">
                        <label for="title" class="block text-gray-700 text-sm font-bold mb-2">
                            Title
                        </label>
                        <input id="title" name="title" type="text"
                            class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Topic title">
                    </div>

                    <div class="mb-4">
                        <label for="description" class="block text-gray-700 text-sm font-bold mb-2">
                            Description
                        </label>
                        <textarea id="description" name="description"
                            class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm resize-vertical"
                            placeholder="Topic description" rows="4"></textarea>
                    </div>


                    <div class="mb-4">
                        <label for="image" class="block text-gray-700 text-sm font-bold mb-2">
                            Image
                        </label>
                        <input id="image" name="image" type="file" accept="image/*"
                            class="appearance-none rounded-none relative block w-full px-2 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            @change="handleImageChange" ref="imageInput" style="display:none;">
                        <button type="button" @click="openFileInput"
                            class="bg-indigo-400 text-white px-2 py-2 rounded-full hover:bg-indigo-600 cursor-pointer">
                            Choisir un fichier
                        </button>
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
                            Create
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <popup-component :message="Topic crée avec succès !" ref="popupComponent"></popup-component>
    <error-popup :message="Erreur lors de la création du topic" ref="errorPopup"></error-popup>
</template>
  
<script>
import Header from '../components/Header.vue';
import UserServices from '../services/UserServices.js'
import PopupComponent from "../components/PopUpValidation.vue";
import ErrorComponent from "../components/PopUpError.vue";

export default {
    components: {
        Header,
        "popupComponent": PopupComponent,
        "errorPopup": ErrorComponent,
    },
    data() {
        return {
            pageName: 'Create Topic',      // Name of the current page
            user: null,                   // User's username
            title: '',                    // Champ de saisie pour le titre
            description: '',              // Champ de saisie pour la description
            selectedImage: null           // Champ pour afficher l'image sélectionnée
        }
    },
    async mounted() {
        try {
            // Check if the user is logged in
            const data = await UserServices.isLoggedIn();
            this.user = data.user;
        } catch (error) {
            console.log(error);
        }
    },
    methods: {
        async createTopic() {
            try {
                // Faire requete POST pour créer un topic dans la bd
                // const response = await TopicServices.createTopic({
                //     title: this.title,
                //     description: this.description,
                //     image: this.selectedImage
                // });

                const response = true;    //pour tester

                if (response) {                 // si la création du topic fonctionne alors afficher le popup et rediriger vers la page home
                    this.showPopup();
                    //attendre fin du popup et rediriger vers la page Home.vue
                    setTimeout(() => {
                        this.$router.push("/");
                    }, 2000);
                } else {
                    this.showErreur();
                }
            } catch (error) {
                console.log(error);
            }
        },

        openFileInput() {
            // Simuler un clic sur l'élément d'entrée de fichier pour ouvrir la boîte de dialogue de sélection de fichier
            this.$refs.imageInput.click();
        },
        handleImageChange(event) {
            // Gérer le changement d'image lorsqu'un fichier est sélectionné
            const file = event.target.files[0]; // Obtenir le fichier sélectionné
            if (file) {
                // Faire quelque chose avec le fichier, par exemple l'afficher dans une image
                this.selectedImage = URL.createObjectURL(file); // Stocker l'URL de l'image
            }
        },
        showPopup() {
            this.$refs.popupComponent.showPopup();
        },
        showErreur() {
            this.$refs.errorComponent.showPopup();
        },
    },
};
</script>
  