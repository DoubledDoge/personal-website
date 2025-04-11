<template>
    <!-- About section with education history and personal information -->
    <section class="text-white mt-18" id="about">
        <!-- Background decoration element -->
        <div class="absolute z-0 top-[93rem] inset-x-0 h-64 flex items-start">
            <div
                class="h-24 w-64 bg-linear-to-br from-primary via-secondary blur-2xl to-[#570cac] opacity-20"
            ></div>
        </div>

        <!-- Main content grid with two columns -->
        <div
            class="md:grid md:grid-cols-2 gap-8 items-center py-8 px-4 xl:gap-16 sm:py-16 xl:px-16 z-1"
        >
            <!-- Education column -->
            <div data-aos="flip-right">
                <h2 class="text-4xl font-bold text-white text-left md-8">
                    My Education
                </h2>

                <!-- Education timeline items -->
                <div class="space-y-8 py-8">
                    <div
                        v-for="element in education"
                        :key="element.id"
                        class="flex items-center md:w-[80%] w-full rounded-xl bg-[#111a3e] shadow-lg border border-[#1f1641]"
                    >
                        <!-- Education icon -->
                        <div class="w-1/4">
                            <img
                                src="https://img.icons8.com/ios-glyphs/60/ffffff/graduation-cap--v1.png"
                                alt="Graduation Cap"
                            />
                        </div>

                        <!-- Education details -->
                        <div class="w-3/4 pl-4">
                            <h3
                                class="text-2xl font-semibold uppercase text-transparent bg-clip-text bg-linear-to-r from-primary to-secondary lg:text-xl"
                            >
                                {{ element.School }}
                            </h3>

                            <p class="text-white">
                                {{ element.Degree }}
                            </p>

                            <p class="text-white">
                                {{ element.Year }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Personal bio column -->
            <div
                class="mt-4 md:mt-0 text-left flex flex-col z-10 h-full"
                data-aos="flip-right"
            >
                <h2
                    class="text-4xl font-bold text-white md:text-center text-left md-4"
                >
                    More
                    <span
                        class="text-transparent bg-clip-text bg-linear-to-r from-primary to-secondary"
                        >About</span
                    >
                    Me
                </h2>

                <!-- Biography paragraphs -->
                <p class="text-base lg:text-lg mt-4 mb-2">
                    As you can see from the website already, I am still only a university student at a highly acclaimed private university called Eduvos. There, I am pursuing my lifelong dream of becoming a Software Engineer by studying for my Bachelor's degree in Information Technology.
                </p>

                <p class="text-base lg:text-lg mt-4 mb-2">
                    My journey began with the programming language of C++, however this year I've switched over to C#, which remains my primary language for everything to do with desktop application development. I have also developed a particular interest in database design and enjoys creating efficient data solutions using SQL Server.
                </p>

                <p class="text-base lg:text-lg mt-4 mb-2">
                    Outside of my coursework, I undertake some other personal hobbies such as video games, hiking and camping. At the same time, I also like to actively work on some personal projects to expand my programming knowledge as you can see in my projects section, where I'm recently learning about web development through the use of Vue.js, Typescript, TailwindCSS and more.
                </p>

                <p class="text-base lg:text-lg mt-4 mb-2">
                    I firmly believe in writing clean and maintainable code as I'm constantly seeking to improve my problem-solving skills through practical applications of my learning. In the end, my goal is to develop into a well-rounded software engineer who can contribute meaningfully to challenging projects while continuing to learn and grow in this ever-evolving field.
                </p>

                <!-- Stats cards -->
                <div class="grid grid-cols-3 gap-4 max-w-lg pt-8">
                    <!-- Average mark stat -->
                    <div
                        class="text-center rounded-xl bg-[#111a3e] shadow-lg border border-[#1f1641] pt-3"
                    >
                        <h3
                            class="text-white font-bold text-xl sm:text-2xl lg:text-3xl"
                        >
                            82.25%
                        </h3>
                        <p class="text-sm sm:text-base text-gray-300">
                            Average Mark
                        </p>
                    </div>

                    <!-- Projects count stat -->
                    <div
                        class="text-center rounded-xl bg-[#111a3e] shadow-lg border border-[#1f1641] pt-3"
                    >
                        <h3
                            class="text-white font-bold text-xl sm:text-2xl lg:text-3xl"
                        >
                            4
                        </h3>
                        <p class="text-sm sm:text-base text-gray-300">
                            Programming Projects
                        </p>
                    </div>

                    <!-- Languages count stat -->
                    <div
                        class="text-center rounded-xl bg-[#111a3e] shadow-lg border border-[#1f1641] pt-3"
                    >
                        <h3
                            class="text-white font-bold text-xl sm:text-2xl lg:text-3xl"
                        >
                            6
                        </h3>
                        <p class="text-sm sm:text-base text-gray-300">
                            Programming Languages
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
/**
 * About Section Component
 *
 * This section provides personal information about the developer, including
 * educational background, biography, and key statistics.
 *
 * Features:
 * - Education timeline with school information
 * - Detailed personal biography
 * - Key statistics about academic and programming achievements
 * - Animations for enhanced visual appeal
 */

import { ref } from "vue";

// -----------------------------------------------------
// State Management
// -----------------------------------------------------

/**
 * Education history data
 * Contains chronological information about academic background
 */
const education = ref([
    {
        id: 1,
        School: "Eduvos",
        Degree: "Bachelor of Science in Information Technology",
        Year: "2024 - Present",
    },
]);
</script>
