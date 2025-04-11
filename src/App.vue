<template>
    <div class="bg-[#111827] min-h-screen">
        <!-- Main application wrapper with Suspense for async component handling -->
        <Suspense>
            <!-- Default content that will show once components are loaded -->
            <template #default>
                <div>
                    <!-- Navigation -->
                    <Navbar />

                    <!-- Main content sections -->
                    <HeroSection />
                    <ServicesSection />
                    <AboutSection />
                    <SkillsAndExperience />
                    <ProjectsSection />
                    <ContactSection />
                    <!-- TODO: Consider implementing testimonial section -->

                    <!-- Page footer and utilities -->
                    <Footer />
                    <BackToTop />
                </div>
            </template>

            <!-- Loading fallback that shows while components are loading -->
            <template #fallback>
                <div class="flex justify-center items-center min-h-screen">
                    <LoadingSpinner />
                </div>
            </template>
        </Suspense>
    </div>
</template>

<script setup lang="ts">
/**
 * Root application component
 *
 * This component serves as the main container for all page sections.
 * It handles:
 * - Asynchronous component loading with Suspense
 * - Initialization of animation library (AOS)
 * - Image preloading for better performance
 * - EmailJS initialization for contact functionality
 */

import { defineAsyncComponent, onMounted } from "vue";
import { preloadImages } from "@/utils/imageLoader";
import emailjs from "@emailjs/browser";
import LoadingSpinner from "./components/loadingSpinner.vue";
import AOS from "aos";
import "aos/dist/aos.css";

// Import images that need preloading
import topPicture from "./assets/top_picture.png";
import personalWebsiteImg from "./assets/personal-website.png";

// -----------------------------------------------------
// Lifecycle Hooks
// -----------------------------------------------------

/**
 * Initialize external libraries and preload important images on component mount
 */
onMounted(async () => {
    console.info("Initializing AOS and preloading images...");

    // Initialize animation library
    AOS.init({
        duration: 800,
        easing: "ease-in-out",
        once: true,
        mirror: false,
    });

    // Preload critical images
    try {
        await preloadImages([topPicture, personalWebsiteImg]);
        console.info("Images preloaded successfully.");
    } catch (error) {
        console.error("Error preloading images:", error);
        alert("Error: Unable to preload images.");
    }

    // Initialize email service
    emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);
    console.info("EmailJS initialized successfully.");
});

// -----------------------------------------------------
// Async Component Configuration
// -----------------------------------------------------

/**
 * Shared configuration for all asynchronously loaded components
 */
const componentOptions = {
    delay: 200,
    timeout: 5000,
    loadingComponent: LoadingSpinner,
    onError(error: Error, retry: () => void) {
        console.error("Error loading component:", error);
        retry();
    },
};

// -----------------------------------------------------
// Component Definitions
// -----------------------------------------------------

// Navigation
const Navbar = defineAsyncComponent({
    ...componentOptions,
    loader: () =>
        import(/* webpackChunkName: "nav" */ "@/components/NavBar.vue"),
});

// Main page sections
const HeroSection = defineAsyncComponent({
    ...componentOptions,
    loader: () =>
        import(/* webpackChunkName: "hero" */ "@/components/HeroSection.vue"),
});

const ServicesSection = defineAsyncComponent({
    ...componentOptions,
    loader: () =>
        import(
            /* webpackChunkName: "service" */ "@/components/ServicesSection.vue"
        ),
});

const AboutSection = defineAsyncComponent({
    ...componentOptions,
    loader: () =>
        import(/* webpackChunkName: "about" */ "@/components/AboutSection.vue"),
});

const SkillsAndExperience = defineAsyncComponent({
    ...componentOptions,
    loader: () =>
        import(
            /* webpackChunkName: "skills" */ "@/components/SkillsAndExperience.vue"
        ),
});

const ProjectsSection = defineAsyncComponent({
    ...componentOptions,
    loader: () =>
        import(
            /* webpackChunkName: "projects" */ "@/components/ProjectsSection.vue"
        ),
});

const ContactSection = defineAsyncComponent({
    ...componentOptions,
    loader: () =>
        import(
            /* webpackChunkName: "contact" */ "@/components/ContactSection.vue"
        ),
});

// Footer and utility components
const Footer = defineAsyncComponent({
    ...componentOptions,
    loader: () =>
        import(/* webpackChunkName: "footer" */ "@/components/Footer.vue"),
});

const BackToTop = defineAsyncComponent({
    ...componentOptions,
    loader: () =>
        import(
            /* webpackChunkName: "backtotop" */ "@/components/BackToTop.vue"
        ),
});
</script>

<style>
/*
 * Global scrollbar styling
 * Provides thin, themed scrollbars that match the site's color scheme
 */
* {
    scrollbar-width: thin;
    scrollbar-color: #111827 #f1f1f1;
}
</style>
