<template>
    <div>
        <Header :user="user" />
    </div>

    <div v-if="topic" class="max-w-4xl mx-auto py-8">
        <h1 class="text-3xl font-semibold mb-6">{{ topic.label }}</h1>

        <!-- Display Messages -->
        <transition-group name="message-slide-in" tag="div">
            <div v-if="messagesLoaded && messages.length > 0">
                <div v-for="message in messages" :key="message._id" class="message-item">
                    <div class="mb-4 p-4 border rounded">
                        <p class="text-gray-800">{{ message.content }}</p>
                        <p class="text-sm text-gray-500">
                            {{ message.creationUser }} - {{ formatDate(message.creationDate) }}
                        </p>
                    </div>
                </div>
            </div>
            <div v-else>
                <p class="text-gray-500" v-show="messagesLoaded">No messages available.</p>
            </div>
        </transition-group>

        <!-- Post Message Form (visible if user is connected) -->
        <div v-if="user && messagesLoaded">
            <h2 class="text-xl font-semibold mt-8 mb-4">Post a Message</h2>
            <form @submit.prevent="postMessage" class="mb-4">
                <textarea v-model="newMessage" rows="4" placeholder="Type your message here..." required
                    class="w-full p-2 border rounded focus:outline-none focus:ring focus:border-indigo-500"></textarea>
                <button type="submit"
                    class="mt-2 bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 focus:outline-none focus:ring focus:border-indigo-500">
                    Post Message
                </button>
            </form>
        </div>
        <div v-else>
            <p class="text-gray-500" v-show="messagesLoaded">Login to post messages.</p>
        </div>
    </div>
</template>
  
  
  
<script>
import Header from '../components/Header.vue';
import UserServices from '../services/UserServices.js';
import { formatDistanceToNow } from 'date-fns';

export default {
    components: {
        Header,
    },
    data() {
        return {
            user: null,
            topic: null,
            messages: [],
            newMessage: '',
            messagesLoaded: false, // Track if messages are loaded
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
            const response = await fetch(`/api/topic/${topicLabel}`, {
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

        this.getMessages();
    },
    methods: {
        async getMessages() {
            // Get the messages from the server
            try {
                const response = await fetch(`/api/message/${this.topic.label}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application.json',
                    },
                });

                const responseData = await response.json();

                if (!response.ok) {
                    throw new Error(responseData.error || 'Internal server error');
                }

                this.messages = responseData.messages;
                this.messagesLoaded = true; // Messages are loaded
            } catch (error) {
                console.error('Error getting messages: ', error);
            }
        },
        async postMessage() {
            try {
                // Send the message to the server
                const response = await fetch('/api/message', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        topic: this.topic.label,
                        content: this.newMessage,
                        creationUser: this.user.username,
                    }),
                });

                const responseData = await response.json();

                if (!response.ok) {
                    throw new Error(responseData.error || 'Internal server error');
                }

                // Refresh the messages
                this.getMessages();
            } catch (error) {
                console.error('Error posting message: ', error);
            } finally {
                // Clear the input field
                this.newMessage = '';
            }
        },
        formatDate(date) {
            const currentDate = new Date();
            const messageDate = new Date(date);
            const timeDifference = currentDate - messageDate;

            if (timeDifference < 60000) {
                return 'just now';
            } else {
                return formatDistanceToNow(new Date(date), { addSuffix: true });
            }
        },
    },
};
</script>
<style>
.message-slide-in-enter-active,
.message-slide-in-leave-active {
    transition: opacity 1.5s, transform 1.5s;
}

.message-slide-in-enter,
.message-slide-in-leave-to {
    opacity: 0;
    transform: translateY(-20px);
}

.message-item {
    animation: slide-in 1s;
}

@keyframes slide-in {
    from {
        opacity: 0;
        transform: translateY(-20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>
  