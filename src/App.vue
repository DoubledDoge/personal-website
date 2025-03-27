<template>
    <div class="bg-[#111827] min-h-screen">
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

<script setup lang="ts">
import { defineAsyncComponent } from "vue";
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
</script>
