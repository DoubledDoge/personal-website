import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import type { UserConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { compression } from "vite-plugin-compression2";
import { createHtmlPlugin } from "vite-plugin-html";

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    compression({
      algorithms: ["gzip"],
      filename: "[path][base].gz",
      threshold: 1024,
      deleteOriginalAssets: false,
    }),
    createHtmlPlugin({
      minify: true,
      inject: {
        data: {
          // These headers will be applied during build
          securityHeaders: {
            "Content-Security-Policy":
              "default-src 'self'; script-src 'self' 'unsafe-inline' https://emailjs.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' https://img.icons8.com data:; connect-src 'self' https://api.emailjs.com; frame-src 'none'; object-src 'none';",
            "X-Content-Type-Options": "nosniff",
            "X-Frame-Options": "DENY",
            "Referrer-Policy": "strict-origin-when-cross-origin",
            "Permissions-Policy":
              "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
        },
      },
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  base: "/personal-website/",
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["vue", "aos"],
          components: [
            "./src/components/NavBar.vue",
            "./src/components/HeroSection.vue",
            "./src/components/ServicesSection.vue",
            "./src/components/AboutSection.vue",
            "./src/components/SkillsAndExperience.vue",
            "./src/components/ProjectsSection.vue",
            "./src/components/ContactSection.vue",
            "./src/components/Footer.vue",
          ],
        },
        assetFileNames: (assetInfo) => {
          // Fixed: added null check for assetInfo.name
          const extType = assetInfo.name?.split(".")[1] ?? "asset";
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            return `assets/img/[name]-[hash][extname]`;
          }
          return `assets/${extType}/[name]-[hash][extname]`;
        },
        chunkFileNames: "assets/js/[name]-[hash].js",
        entryFileNames: "assets/js/[name]-[hash].js",
      },
    },
    chunkSizeWarningLimit: 1000,
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    reportCompressedSize: true,
    assetsInlineLimit: 4096,
    cssCodeSplit: true,
    sourcemap: false,
  },
  optimizeDeps: {
    include: ["vue", "aos"],
  },
}) satisfies UserConfig;
