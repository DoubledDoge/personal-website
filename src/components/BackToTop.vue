<template>
    <!-- Floating "back to top" button that appears when scrolling down -->
    <button
        v-if="isVisible"
        @click="scrollToTop"
        class="fixed bottom-4 right-4 bg-linear-to-r from-primary to-pink-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl cursor-pointer transition-opacity duration-300 hover:bg-blue-600"
        aria-label="Scroll back to top"
    >
        ↥
    </button>
</template>

<script setup lang="ts">
/**
 * Back To Top Component
 *
 * Provides a floating button that appears when the user scrolls down the page,
 * allowing them to quickly return to the top of the page with a single click.
 *
 * Features:
 * - Automatically shows/hides based on scroll position
 * - Smooth scrolling animation
 * - Cleans up event listeners when component is unmounted
 */

import { ref, onMounted, onUnmounted } from "vue";

// -----------------------------------------------------
// State Management
// -----------------------------------------------------

/**
 * Controls the visibility of the button based on scroll position
 */
const isVisible = ref(false);

// -----------------------------------------------------
// Methods
// -----------------------------------------------------

/**
 * Updates button visibility based on current scroll position
 * Shows button when user has scrolled more than 300px down
 */
const handleScroll = () => {
    isVisible.value = window.scrollY > 300;
};

/**
 * Scrolls the window smoothly back to the top
 */
const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
};

// -----------------------------------------------------
// Lifecycle Hooks
// -----------------------------------------------------

/**
 * Set up scroll event listener when component is mounted
 */
onMounted(() => {
    window.addEventListener("scroll", handleScroll);
});

/**
 * Clean up scroll event listener when component is unmounted
 * to prevent memory leaks
 */
onUnmounted(() => {
    window.removeEventListener("scroll", handleScroll);
});
</script>
