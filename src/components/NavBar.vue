<template>
  <!-- Main navigation header -->
  <header
    class="fixed top-0 left-0 w-full flex justify-between items-center p-6 bg-transparent backdrop-blur-md border-b border-white/20 shadow-lg z-50 transition-all duration-300"
    style="backdrop-filter: blur(16px)"
  >
    <!-- Site logo/brand -->
    <div class="text-white text-3xkl font-bold drop-shadow-lg">Dihan Britz</div>

    <!-- Mobile menu toggle button - only visible on small screens -->
    <div class="md:hidden z-30">
      <button
        type="button"
        class="block focus:outline-none"
        @click="isMenuOpen = !isMenuOpen"
        aria-label="Toggle navigation menu"
      >
        <span v-if="isMenuOpen" class="text-5xl">
          <img
            src="https://img.icons8.com/ios-filled/100/ffffff/delete-sign.png"
            alt="Close"
            width="50"
            height="50"
          />
        </span>

        <span v-else class="text-5xl">
          <img
            src="https://img.icons8.com/ios-filled/100/ffffff/menu--v6.png"
            alt="Menu"
            width="50"
            height="50"
          />
        </span>
      </button>
    </div>

    <!-- Navigation links container -->
    <nav
      :class="[
        'fixed inset-0 z-40 flex flex-col items-center justify-center bg-[#111827] bg-opacity-95 md:relative md:bg-transparent md:flex md:justify-between md:flex-row',
        isMenuOpen ? 'block' : 'hidden',
      ]"
    >
      <!-- Menu items list -->
      <ul
        class="flex flex-col items-center space-y-5 md:flex-row md:space-x-5 md:space-y-0"
      >
        <li v-for="item in Menu" :key="item.name">
          <a
            :href="item.href"
            class="block text-white transition hover:text-primary ease-linear text-2xl md:text-lg"
            @click="scrollToSection(item.href)"
          >
            {{ item.name }}
          </a>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup lang="ts">
/**
 * Navigation Bar Component
 *
 * This component handles the site navigation with responsive mobile/desktop views.
 * Features:
 * - Responsive design with mobile hamburger menu
 * - Smooth scrolling to sections
 * - Dynamic menu items from data
 */

import { ref } from "vue";

// -----------------------------------------------------
// State Management
// -----------------------------------------------------

/**
 * Menu items configuration
 * Each item has a display name and a section ID to scroll to
 */
const Menu = ref([
  { name: "Services", href: "#services" },
  { name: "About Me", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
]);

/**
 * Controls the visibility of the mobile menu
 */
const isMenuOpen = ref(false);

// -----------------------------------------------------
// Methods
// -----------------------------------------------------

/**
 * Handles smooth scrolling to page sections when navigation links are clicked
 * Also closes the mobile menu after selection
 *
 * @param href - The section ID to scroll to (e.g., "#about")
 */
const scrollToSection = (href: string) => {
  // Close mobile menu after selection
  isMenuOpen.value = false;

  // Find the target section and scroll to it
  const section = document.querySelector(href);
  if (section) {
    section.scrollIntoView({
      behavior: "smooth",
    });
  }
};
</script>
