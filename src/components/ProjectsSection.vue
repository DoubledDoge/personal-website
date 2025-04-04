<template>
    <section class="text-white mt-20" id="projects">
        <div class="px-4 xl:pl-16">
            <div class="mb-4md:flex md:justify-between xl:pr-16">
                <h2 class="text-4xl font-bold text-white">
                    My Latest Projects
                </h2>

                <div class="flex space-x-4 mb-4 mt-5 md:mt-0">
                    <button
                        v-for="category in [
                            'All',
                            'Web Development',
                            'Desktop Application',
                        ]"
                        :key="category"
                        @click="() => (selectedCategory = category)"
                        :class="[
                            'px-4 py-2 rounded-full transition-all duration-300',
                            selectedCategory === category
                                ? 'bg-primary-500 text-white'
                                : 'text-[#ADB7BE] hover:text-primary',
                        ]"
                    >
                        {{ category }}
                    </button>
                </div>
            </div>

            <div v-if="isLoading" class="flex justify-center items-center py-20">
                <LoadingSpinner />
            </div>
            <div v-else>
                <ul
                    class="px-4 sm:py-16 xl:pr-16 grid grid-cols-1 gap-6 pt-10 sm:grid-cols-2 md:gap-10 md:pt-12 lg:grid-cols-3"
                    data-aos="fade-right"
                >
                    <div v-for="project in filteredProjects" :key="project.id">
                        <div class="group relative">
                            <!-- Project Image -->
                            <div
                                class="h-52 md:h-[24rem] rounded-t-xl bg-cover bg-center"
                                :style="{
                                    backgroundImage: `url(${loadedImages.get(project.image) || project.image})`
                                }"
                            >
                                <!-- Single Overlay -->
                                <div
                                    class="absolute inset-0 bg-[#181818] opacity-0 group-hover:opacity-80 transition-all duration-500 flex items-center justify-center"
                                >
                                    <div class="flex space-x-4">
                                        <!-- Live Demo Button -->
                                        <a
                                            v-if="project.webURL"
                                            :href="project.webURL"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            class="h-14 w-14 border-2 relative rounded-full border-[#ADB7BE] hover:border-white group/link"
                                            title="View Live Demo"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke-width="1.5"
                                                stroke="currentColor"
                                                class="h-10 w-10 text-[#ADB7BE] group-hover/link:text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                                            >
                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
                                                />
                                            </svg>
                                        </a>

                                        <!-- GitHub Button -->
                                        <a
                                            v-if="project.gitURL"
                                            :href="project.gitURL"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            class="h-14 w-14 border-2 relative rounded-full border-[#ADB7BE] hover:border-white group/link"
                                            title="View Source Code"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                class="h-10 w-10 text-[#ADB7BE] group-hover/link:text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                                                viewBox="0 0 24 24"
                                                fill="currentColor"
                                            >
                                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <!-- Project Info Card -->
                            <div class="text-white rounded-b-xl bg-[#111a3e] shadow-lg border border-[#1f1641] py-6 px-4">
                                <h3
                                    class="text-lg font-semibold uppercase lg:text-xl"
                                >
                                    {{ project.title }}
                                </h3>

                                <p class="text-[#ADB7BE]">
                                    {{ project.description }}
                                </p>

                                <div class="flex flex-wrap p-2.5">
                                    <div
                                        v-for="technology in project.technologies"
                                        :key="technology"
                                        class="text-center ml-1 mt-1 rounded-3xl bg-[#111827]"
                                        style="
                                            box-shadow: 0 4px 30px
                                                rgba(0, 0, 0, 0.1);
                                            border: 1px solid #111827;
                                            backdrop-filter: blur(9px);
                                            -webkit-backdrop-filter: blur(9px);
                                        "
                                    >
                                        <p class="px-1 py-2">
                                            {{ technology }}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </ul>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { lazyLoadImage } from "@/utils/imageLoader";
import LoadingSpinner from "./loadingSpinner.vue";
import personalWebsiteImg from '@/assets/personal-website.png';
import calculatorWebsiteImg from '@/assets/calculator-website.png';
import cSharpUniversityImg from '@/assets/cSharp-university.png';
import cPlusPlusUniversityImg from '@/assets/cPlusPlus-university.png';

const loadedImages = ref(new Map<string, string>());
const isLoading = ref(true);

onMounted(async () => {
    try {
        const imageSources = [
            personalWebsiteImg,
            calculatorWebsiteImg,
            cSharpUniversityImg,
            cPlusPlusUniversityImg
        ];

        await Promise.all(
            imageSources.map(async (src) => {
                const loadedSrc = await lazyLoadImage(src);
                loadedImages.value.set(src, loadedSrc);
            })
        );
    } catch (error) {
        console.error('Error loading images:', error);
    } finally {
        isLoading.value = false;
    }
});

const Projects = ref([
    {
        id: 1,
        category: "Web Development",
        image: personalWebsiteImg,
        title: "Personal Website",
        description: "My very own website made from scratch using various modern web technologies. Also, the website you are currently on!",
        technologies: ["Vue", "Tailwind CSS", "TypeScript"],
        gitURL: "https://github.com/DoubledDoge/personal-website",
        webURL: "https://doubleddoge.github.io/personal-website/",
    },
    {
        id: 2,
        category: "Web Development",
        image: calculatorWebsiteImg,
        title: "Calculator Website",
        description: "Its a extremely simplistic website that is meant to function as a calculator. Previously it served me as an introduction into web development as a whole.",
        technologies: ["Svelte", "SCSS", "TypeScript"],
        gitURL: "https://github.com/DoubledDoge/just-another-calculator-website",
        webURL: "https://doubleddoge.github.io/just-another-calculator-website/",
    },
    {
        id: 3,
        category: "Desktop Application",
        image: cSharpUniversityImg,
        title: "C# University Project",
        description: "This project was strictly meant as an representation of the work I've done on my own university assignment. It is still highly incomplete, and rests in my GitHub page waiting for me to eventually complete it. Even though parts of it is perfectly refined to fit my own vision of the applications contained within, it is important to know that these aren't meant to be seen as enterprise quality or anything.",
        technologies: ["C#", ".NET", "SQL"],
        gitURL: "https://github.com/DoubledDoge/itpca2-formative",
        webURL: "",
    },
    {
        id: 4,
        category: "Desktop Application",
        image: cPlusPlusUniversityImg,
        title: "C++ University Project",
        description: "My very first programming project as a whole. This currently lies archived in my GitHub repository, with absolutely no major changes planned for it. Please note that there are quite a few things that I could change as it is very much created from the mindset of a programmer just starting out, so please don't take this project too seriously.",
        technologies: ["C++"],
        gitURL: "https://github.com/DoubledDoge/itppa1-formative",
        webURL: "",
    },
]);

const selectedCategory = ref("All");

const filteredProjects = computed(() => {
    if (selectedCategory.value === "All") {
        return Projects.value;
    }
    return Projects.value.filter(
        (project) => project.category === selectedCategory.value
    );
});
</script>
