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
        icon: "https://img.icons8.com/ios-filled/50/ffffff/c-sharp-logo.png",
        name: "C# Development",
        description:
            "Development of desktop applications and basic software solutions using C# and .NET framework. Specializing in Windows Forms applications and console-based programs.",
    },
    {
        id: 2,
        icon: "https://img.icons8.com/ios-filled/50/ffffff/database.png",
        name: "Database Design",
        description:
            "Design and implementation of SQL databases, including data modeling, basic query optimization, and database management using Microsoft SQL Server.",
    },
    {
        id: 3,
        icon: "https://img.icons8.com/ios-filled/50/ffffff/code.png",
        name: "Academic Projects",
        description:
            "Collaboration on software engineering projects, with experience in version control (Git), documentation, and implementing solutions based on academic requirements.",
    }
]);
</script>
