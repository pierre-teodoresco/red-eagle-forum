<template>
    <div class="flex flex-col items-center justify-center h-screen">
        <h1 class="text-6xl font-bold mb-4">404</h1>
        <p class="text-gray-600 text-xl mb-8">Page not found</p>
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            <router-link to="/">Go back home</router-link>
        </button>
    </div>
</template>

<script>
export default {
    name: "PageNotFound",
};
</script>
