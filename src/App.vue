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
import AOS from "aos";
import "aos/dist/aos.css";

// Initialize AOS
onMounted(() => {
    AOS.init({
        duration: 800,
        easing: "ease-in-out",
        once: true,
        mirror: false,
    });
});

//Import Components Asynchronously
const Navbar = defineAsyncComponent(() => import("@/components/NavBar.vue"));
const HeroSection = defineAsyncComponent(
    () => import("@/components/HeroSection.vue"),
);
const ServicesSection = defineAsyncComponent(
    () => import("@/components/ServicesSection.vue"),
);
const AboutSection = defineAsyncComponent(
    () => import("@/components/AboutSection.vue"),
);
const SkillsAndExperience = defineAsyncComponent(
    () => import("@/components/SkillsAndExperience.vue"),
);
const ProjectsSection = defineAsyncComponent(
    () => import("@/components/ProjectsSection.vue"),
);
const ContactSection = defineAsyncComponent(
    () => import("@/components/ContactSection.vue"),
);
// Testimonial Section?
const Footer = defineAsyncComponent(() => import("@/components/Footer.vue"));
const BackToTop = defineAsyncComponent(
    () => import("@/components/BackToTop.vue"),
);

import LoadingSpinner from "./components/loadingSpinner.vue";
</script>

<style>
* {
    scrollbar-width: thin;
    scrollbar-color: #111827 #f1f1f1;
}
</style>
