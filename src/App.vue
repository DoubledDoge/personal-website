<template>
    <div class="bg-[#111827] min-h-screen">
        <!-- Wrap Components in Suspense to handle loading -->
        <Suspense>
            <template #default>
                <!--Wrap all Components inside a single root element-->
                <div>
                    <Navbar />
                    <HeroSection />
                    <ServicesSection />
                    <AboutSection />
                    <SkillsAndExperience />
                    <ProjectsSection />
                    <ContactSection />
                    <!-- Should I implement testimonial section? -->
                    <Footer />
                    <BackToTop />
                </div>
            </template>

            <template #fallback>
                <div class="flex justify-center items-center min-h-screen">
                    <LoadingSpinner />
                </div>
            </template>
        </Suspense>
    </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, onMounted } from "vue";
import { preloadImages } from '@/utils/imageLoader';
import emailjs from '@emailjs/browser';
import LoadingSpinner from "./components/loadingSpinner.vue";
import AOS from "aos";
import "aos/dist/aos.css";
import topPicture from './assets/top_picture.png';
import personalWebsiteImg from './assets/personal-website.png';

// Initialize AOS and preload images
onMounted(async () => {
    AOS.init({
        duration: 800,
        easing: "ease-in-out",
        once: true,
        mirror: false,
    });

    await preloadImages([
        topPicture,
        personalWebsiteImg
    ]);

    emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);
});

const componentOptions = {
    delay: 200,
    timeout: 5000,
    loadingComponent: LoadingSpinner,
    onError(error: Error, retry: () => void) {
        console.error('Error loading component:', error);
        retry();
    }
}

//Import Components Asynchronously
const Navbar = defineAsyncComponent({
    ...componentOptions, loader: () => import(/* webpackChunkName: "nav" */ "@/components/NavBar.vue")
});
const HeroSection = defineAsyncComponent({
   ...componentOptions, loader: () => import(/* webpackChunkName: "hero" */ "@/components/HeroSection.vue"),
});
const ServicesSection = defineAsyncComponent({
   ...componentOptions, loader: () => import(/* webpackChunkName: "service" */ "@/components/ServicesSection.vue"),
});
const AboutSection = defineAsyncComponent({
   ...componentOptions, loader: () => import(/* webpackChunkName: "about" */ "@/components/AboutSection.vue"),
});
const SkillsAndExperience = defineAsyncComponent({
   ...componentOptions, loader: () => import(/* webpackChunkName: "skills" */ "@/components/SkillsAndExperience.vue"),
});
const ProjectsSection = defineAsyncComponent({
   ...componentOptions, loader: () => import(/* webpackChunkName: "projects" */ "@/components/ProjectsSection.vue"),
});
const ContactSection = defineAsyncComponent({
   ...componentOptions, loader: () => import(/* webpackChunkName: "contact" */ "@/components/ContactSection.vue"),
});
// Testimonial Section?
const Footer = defineAsyncComponent({
   ...componentOptions, loader: () => import(/* webpackChunkName: "footer" */ "@/components/Footer.vue"),
});
const BackToTop = defineAsyncComponent({
   ...componentOptions, loader: () => import(/* webpackChunkName: "backtotop" */"@/components/BackToTop.vue"),
});
</script>

<style>
* {
    scrollbar-width: thin;
    scrollbar-color: #111827 #f1f1f1;
}
</style>
