/**
 * Main application entry point
 * This file initializes the Vue application and mounts it to the DOM
 */

import { createApp } from "vue";
import "./style.css"; // Import global styles
import App from "./App.vue"; // Import root component

// Create and mount the Vue application to the #app element in index.html
createApp(App).mount("#app");
