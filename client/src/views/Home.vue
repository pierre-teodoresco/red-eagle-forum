<template>
    <div class="bg-gray-100 min-h-screen">
        <Header :user="user" />
        <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div class="px-4 py-6 sm:px-0">
                <div class="flex justify-between items-center mb-8">
                    <h1 class="text-3xl font-bold text-gray-900">All Topics</h1>
                    <router-link to="/create-topic"
                        class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                        Create a new topic
                    </router-link>
                </div>
                <div class="grid gap-6">
                    <div v-for="topic in topics" :key="topic.label" class="bg-white overflow-hidden shadow rounded-lg">
                        <div class="px-4 py-5 sm:p-6">
                            <h2 class="text-xl font-bold text-gray-900 mb-2">{{ topic.label }}</h2>
                            <p class="text-gray-500">{{ topic.description }}</p>
                        </div>
                    </div>
                </div>
            </div>
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
            user: null,                   // User's username
            topics: [],                   // List of all topics
        }
    },
    async mounted() {
        try {
            // Check if the user is logged in
            const data = await UserServices.isLoggedIn();
            this.user = data.user;

            this.getAllTopics();

        } catch (error) {
            console.log(error);
        }
    },
    methods: {
        async getAllTopics() {
            try {
                // Get all topics
                const response = await fetch('/topic', {
                    method: 'GET',
                });

                const responseData = await response.json();

                if (!response.ok) {
                    throw new Error(responseData.error || 'Something went wrong');
                }

                this.topics = responseData.topics;

                // Sort the topics by creation date (the sooner, the first)
                this.topics.sort((a, b) => {
                    return new Date(b.creationDate) - new Date(a.creationDate);
                });
                

            } catch (error) {
                console.log(error);
            }
        }
    }
};
</script>
