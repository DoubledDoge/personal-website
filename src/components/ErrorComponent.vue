<template>
    <div class="flex items-center justify-center min-h-screen bg-[#111827] text-white">
        <div class="text-center">
            <h2 class="text-xl font-bold mb-4">Something went wrong</h2>
            <button
                @click="reload"
                class="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
            >
                Retry
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
const reload = () => {
    window.location.reload();
};
</script>