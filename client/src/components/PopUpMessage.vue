<!-- components/PopUpError.vue -->
<template>
    <div>
        <div v-show="showPopup" :class="`${bgColor} text-white p-4 text-center fixed top-16 w-full z-50`">
            {{ message }}
        </div>
    </div>
</template>
    
<script>
export default {
    props: {
        showPopup: {
            type: Boolean,
            default: false
        },
        message: String,
        timeout: {
            type: Number,
            default: 2000
        },
        bgColor: {
            type: String,
            default: 'bg-green-500'
        },
    },
};
</script>
  