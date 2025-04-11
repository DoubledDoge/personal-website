<template>
    <!-- Site footer with copyright information -->
    <footer
        class="mt-8 border z-10 border-t-[#33353F] border-l-transparent border-r-transparent text-white"
    >
        <div class="container p-12 flex flex-col md:flex-row justify-between items-center">
            <!-- Site brand/logo -->
            <div class="text-white text-3xl font-bold mb-4 md:mb-0">Dihan Britz</div>

            <!-- Copyright and license information -->
            <div class="text-slate-600 text-center md:text-right">
                <p>© 2025 Dihan Britz</p>
                <p class="text-sm">
                    <a href="https://github.com/DoubledDoge/personal-website/blob/main/LICENSE" target="_blank" rel="noopener noreferrer" class="hover:text-white">
                        Open source under MIT License
                    </a>
                </p>
            </div>
        </div>
    </footer>
</template>

<script setup lang="ts">
/**
 * Site Footer Component
 *
 * A simple footer that displays the site branding, copyright information,
 * and license details. Responsive layout that adapts to different screen sizes.
 */

// Define component name for debugging and DevTools
defineOptions({
    name: 'SiteFooter'
});
</script>
