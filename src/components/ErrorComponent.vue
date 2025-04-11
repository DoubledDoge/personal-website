<template>
    <!-- Error fallback display shown when component loading fails -->
    <div class="flex items-center justify-center min-h-screen bg-[#111827] text-white">
        <div class="text-center">
            <h2 class="text-xl font-bold mb-4">Something went wrong</h2>
            <button
                @click="reload"
                class="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
                aria-label="Retry loading the page"
            >
                Retry
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
/**
 * Error Component
 *
 * A fallback component displayed when there's an error loading other components.
 * Provides a simple interface to let users retry by reloading the page.
 */

/**
 * Reloads the current page to attempt recovery from the error
 */
const reload = () => {
    window.location.reload();
};
</script>