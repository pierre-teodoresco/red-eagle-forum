<template>
    <div>
        <Header :user="user" />
        <!-- Display validation popup when showValidation is true -->
        <PopupComponent :showPopup="showValidation" message="Topic created with success!" bgColor="bg-green-500" />

        <!-- Display error popup when showError is true -->
        <PopupComponent :showPopup="showError" message="Error during topic creation!" bgColor="bg-red-500" />
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
                        <input id="title" name="title" type="text" required v-model="title"
                            class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Topic title">
                    </div>

                    <div class="mb-4">
                        <label for="description" class="block text-gray-700 text-sm font-bold mb-2">
                            Description
                        </label>
                        <textarea id="description" name="description" required v-model="description"
                            class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm resize-vertical"
                            placeholder="Topic description" rows="4"></textarea>
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
</template>
  
<script>
import Header from '../components/Header.vue';
import UserServices from '../services/UserServices.js'
import PopupComponent from "../components/PopUpMessage.vue";

export default {
    components: {
        Header,
        PopupComponent,
    },
    data() {
        return {
            // Header
            user: null,                                     // User

            // Form
            title: '',                                      // Title input field
            description: '',                                // Description input field

            // PopUp's
            timeout: 2000,                                  // Time to display the popup
            showValidation: false,                          // Show the validation popup
            showError: false,                               // Show the error popup
        }
    },
    async mounted() {
        // User logged in ?
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
                // Send a request to the server to create a new topic
                const response = await fetch('/topic', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        label: this.title,
                        description: this.description,
                        creationUser: this.user.username,
                        creationDate: null,
                    }),
                });

                // Get the data from the backend response
                const responseData = await response.json();

                if (!response.ok) {
                    // The request failed
                    throw new Error(responseData.error || 'Topic creation failed');
                }
                
                // If the topic creation succeeds, display a green popup and redirect to the Home page
                this.showValidation = true;
                setTimeout(() => {
                    this.$router.push("/");
                }, this.timeout);

                // Reset form
                this.$refs.creationTopicForm.reset();
            } catch (error) {
                // handle error
                this.showError = true;
                console.log(error);
            } finally {
                // Clear form
                this.title = '';
                this.description = '';
            }
        },
    },
};
</script>
  
