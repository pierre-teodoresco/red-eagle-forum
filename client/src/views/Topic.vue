<template>
    <div>
        <Header :user="user" />
    </div>

    <div v-if="topic" class="max-w-4xl mx-auto py-8">
        <h1 class="text-3xl font-semibold mb-6">{{topic.label}}</h1>

        <!-- Display Messages -->
        <div v-if="messages.length">
            <div v-for="message in messages" :key="message.id" class="mb-4 p-4 border rounded">
                <p class="text-gray-800">{{ message.content }}</p>
                <p class="text-sm text-gray-500">{{ message.author }} - {{ message.createdAt }}</p>
            </div>
        </div>
        <div v-else>
            <p class="text-gray-500">No messages available.</p>
        </div>

        <!-- Post Message Form (visible if user is connected) -->
        <div v-if="user">
            <h2 class="text-xl font-semibold mt-8 mb-4">Post a Message</h2>
            <form @submit.prevent="postMessage" class="mb-4">
                <textarea v-model="newMessage" rows="4" placeholder="Type your message here..."
                    class="w-full p-2 border rounded focus:outline-none focus:ring focus:border-indigo-500"></textarea>
                <button type="submit"
                    class="mt-2 bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 focus:outline-none focus:ring focus:border-indigo-500">
                    Post Message
                </button>
            </form>
        </div>
        <div v-else>
            <p class="text-gray-500">Login to post messages.</p>
        </div>
    </div>
</template>
  
<script>
import Header from '../components/Header.vue';
import UserServices from '../services/UserServices.js';

export default {
    components: {
        Header,
    },
    data() {
        return {
            user: null,
            topic: null,
            messages: [
                { id: 1, content: 'First message', author: 'John Doe', createdAt: '2 hours ago' },
                { id: 2, content: 'Another message', author: 'Jane Doe', createdAt: '1 hour ago' },
                // Add more sample messages
            ],
            newMessage: '',
        };
    },
    async mounted() {
        try {
            const data = await UserServices.isLoggedIn();
            this.user = data.user;
        } catch (error) {
            console.log(error);
        }

        // Get the topic label from the URL
        const topicLabel = this.$route.params.label;

        // Get the topic from the server
        try {
            const response = await fetch(`/topic/${topicLabel}`, {
                method: 'GET',
            });

            const responseData = await response.json();

            if (!response.ok) {
                throw new Error(responseData.error || 'Internal server error');
            }

            this.topic = responseData.topic;
        } catch (error) {
            console.error('Error getting topic: ', error);
        }
    },
    methods: {
        postMessage() {
            if (!this.newMessage.trim()) {
                // Don't post empty messages
                return;
            }

            // Add the new message to the list (replace with actual API call)
            const newMessage = {
                id: this.messages.length + 1,
                content: this.newMessage,
                author: this.user.username, // Assuming username is available in user data
                createdAt: 'just now', // Replace with actual timestamp
            };

            this.messages.unshift(newMessage);

            // Clear the input field
            this.newMessage = '';
        },
    },
};
</script>
