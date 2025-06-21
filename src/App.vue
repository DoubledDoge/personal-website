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
 * - Integration with initial loading spinner
 */

import { defineAsyncComponent, onMounted, nextTick } from "vue";
import { preloadImages } from "@/utils/imageLoader";
import emailjs from "@emailjs/browser";
import LoadingSpinner from "./components/loadingSpinner.vue";
import AOS from "aos";
import "aos/dist/aos.css";

// Import images that need preloading
import topPicture from "./assets/top_picture.png";
import personalWebsiteImg from "./assets/personal-website.png";

// TypeScript declaration for global function
declare global {
  interface Window {
    hideInitialLoader?: () => void;
    getLoadTime?: () => number;
  }
}

// -----------------------------------------------------
// Lifecycle Hooks
// -----------------------------------------------------

/**
 * Initialize external libraries and preload important images on component mount
 */
onMounted(async () => {
  console.info("🚀 Initializing Vue app...");

  try {
    // Initialize animation library with optimized settings
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
      mirror: false,
      offset: 100,
      delay: 50,
    });

    // Preload critical images concurrently
    const imagePreloadPromise = preloadImages([topPicture, personalWebsiteImg]);

    // Initialize email service
    const emailJSPromise = new Promise<void>((resolve) => {
      emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);
      resolve();
    });

    // Wait for both operations to complete
    await Promise.all([imagePreloadPromise, emailJSPromise]);

    console.info("✅ Images preloaded and EmailJS initialized successfully.");

    // Wait for next tick to ensure DOM is fully rendered
    await nextTick();

    // Small delay to ensure smooth transition from initial loader
    setTimeout(() => {
      // Hide the initial HTML loader now that Vue app is ready
      if (window.hideInitialLoader) {
        window.hideInitialLoader();
        console.info("🎉 App fully loaded and initial loader hidden");

        // Log performance metrics
        if (window.getLoadTime) {
          console.info(
            `⚡ Total load time: ${Math.round(window.getLoadTime())}ms`,
          );
        }
      }
    }, 100);
  } catch (error) {
    console.error("❌ Error during app initialization:", error);

    // Still hide loader even if there are errors
    if (window.hideInitialLoader) {
      window.hideInitialLoader();
    }

    // User-friendly error handling
    if (error instanceof Error && error.message.includes("preload")) {
      console.warn(
        "⚠️ Some images failed to preload, but app will continue normally",
      );
    } else {
      console.error(
        "💥 Critical initialization error - please refresh the page",
      );
    }
  }
});

// -----------------------------------------------------
// Async Component Configuration
// -----------------------------------------------------

/**
 * Shared configuration for all asynchronously loaded components
 * Enhanced with better error handling and performance monitoring
 */
const componentOptions = {
  delay: 200,
  timeout: 8000, // Increased timeout for slower connections
  loadingComponent: LoadingSpinner,
  onError(error: Error, retry: () => void, fail: () => void, attempts: number) {
    console.error(`❌ Error loading component (attempt ${attempts}):`, error);

    // Retry up to 2 times, then fail gracefully
    if (attempts <= 2) {
      console.info(`🔄 Retrying component load (attempt ${attempts + 1})`);
      setTimeout(retry, 1000 * attempts); // Exponential backoff
    } else {
      console.error("💥 Component failed to load after 2 retries");
      fail();
    }
  },
};

// -----------------------------------------------------
// Component Definitions
// -----------------------------------------------------

// Navigation
const Navbar = defineAsyncComponent({
  ...componentOptions,
  loader: () => import(/* webpackChunkName: "nav" */ "@/components/NavBar.vue"),
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
    import(/* webpackChunkName: "contact" */ "@/components/ContactSection.vue"),
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
    import(/* webpackChunkName: "backtotop" */ "@/components/BackToTop.vue"),
});
</script>

<style>
/*
 * Global scrollbar styling
 * Provides thin, themed scrollbars that match the site's color scheme
 */
* {
  scrollbar-width: thin;
  scrollbar-color: #6b7280 #374151;
}

/* Webkit browsers (Chrome, Safari, Edge) */
*::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

*::-webkit-scrollbar-track {
  background: #374151;
  border-radius: 4px;
}

*::-webkit-scrollbar-thumb {
  background: #6b7280;
  border-radius: 4px;
  transition: background 0.2s ease;
}

*::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}

/*
 * Smooth transitions for better UX
 */
* {
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease,
    color 0.2s ease;
}

/*
 * Prevent flash of unstyled content
 */
body {
  margin: 0;
  padding: 0;
  background-color: #111827;
}

/*
 * Enhanced focus styles for accessibility
 */
*:focus {
  outline: 2px solid #f59e0b;
  outline-offset: 2px;
}

/*
 * Improve text rendering
 */
* {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/*
 * Performance optimizations
 */
img {
  content-visibility: auto;
}

/*
 * Animation performance
 */
[data-aos] {
  will-change: transform, opacity;
}
</style>
