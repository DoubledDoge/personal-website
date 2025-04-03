<template>
    <section class="text-white mt-20" id="services">
        <div class="px-4 xl:pl-16">
            <h2 class="text-4xl font-bold text-white mb-4">My Services</h2>
        </div>

        <div
            :class="[
                'py-8',
                'xl:px-16',
                'px-4',
                'sm:py-16',
                'grid',
                'grid-cols-1',
                'gap-6',
                'pt-10',
                'sm:grid-cols-2',
                'md:gap-10',
                'md:pt-12',
                'lg:grid-cols-3',
            ]"
        >
            <div
                v-for="service in services"
                :key="service.id"
                data-aos="fade-up"
                class="px-8 py-12 rounded-xl bg-[#111a3e] shadow-lg border border-[#1f1641]"
            >
                <div
                    class="mx-auto h-24 w-24 xl:h-28 xl:w-28 flex items-center justify-center"
                >
                    <div>
                        <img
                            :src="service.icon"
                            alt="Service Icon"
                            class="w-20 h-20"
                        />
                    </div>
                </div>

                <div class="text-center">
                    <h3
                        class="pt-8 text-lg font-semibold uppercase text-transparent bg-clip-text bg-linear-to-r from-primary to-secondary lg:text-xl"
                    >
                        {{ service.name }}
                    </h3>
                    <p
                        class="text-gray pt-4 text-sm group-hover:text-white md:text-base"
                    >
                        {{ service.description }}
                    </p>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
const services = ref([
    {
        id: 1,
        icon: "https://img.icons8.com/ios-filled/50/ffffff/google-code.png",
        name: "Web Development",
        description:
            "Building responsive and functional websites using modern technologies. (Placeholder text)",
    },
    {
        id: 2,
        icon: "https://img.icons8.com/external-vectorslab-glyph-vectorslab/100/fffeee/external-Technical-Writing-mobile-app-development-vectorslab-glyph-vectorslab.png",
        name: "Technical Writing",
        description:
            "Creating clear and concise documentation for software and applications. (Placeholder text)",
    },
    {
        id: 3,
        icon: "https://img.icons8.com/external-glyph-design-circle/100/ffffff/external-Mobile-Development-digital-marketing-solid-design-circle.png",
        name: "Mobile Development",
        description:
            "Developing mobile applications for iOS and Android platforms. (Placeholder text)",
    },
]);
</script>
