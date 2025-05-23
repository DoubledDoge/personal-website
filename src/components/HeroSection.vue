<template>
    <section class="relative w-full" data-aos="zoom-in-up">
        <div class="absolute top-0 inset-x-0 h-64 flex items-start">
            <div
                class="h-24 w-2/3 bg-linear-to-br from-[#570cac] blur-2xl invisible opacity-40"
            ></div>
            <div
                class="h-20 w3/5 bg-linear-to-r from-[#670ccf] blur-2xl opacity-40"
            ></div>
        </div>

        <div
            class="w-full px-5 sm:px-8 md:px-12 lg:px-8 max-w-(--breakpoint-lg) lg:max-w-(--breakpoint-xl) mx-auto relative"
        >
            <div
                class="grid lg:grid-cols-2 gap-10 xl:gap-14 relative pt-24 lg:max-w-none max-w-2xl md:max-w-3xl mx-auto"
            >
                <div class="lg:py-6">
                    <div class="text-center lg:text-left">
                        <h1
                            class="pt-4 text-white font-bold text-4xl md:text-5xl lg:text-6xl"
                        >
                            Hi, I'm
                            <span
                                class="text-transparent bg-clip-text bg-linear-to-r from-primary to-pink-500"
                            >
                                Dihan </span
                            >😊
                        </h1>
                    </div>

                    <p
                        class="text-gray-300 pt-8 text-center lg:text-left mx-auto max-w-wl"
                    >
                        I'm an aspiring Software Engineer and Information
                        Technology student at Eduvos, focusing on C# development
                        and database design. With a strong foundation in desktop
                        applications and a growing interest in web technologies,
                        I'm passionate about creating efficient, maintainable
                        solutions while continuously expanding my technical
                        expertise.
                    </p>

                    <div
                        class="flex items-center gap-3 pt-9 flex-col sm:flex-row sm:w-max sm:mx-auto lg:mx-0"
                    >
                        <button
                            @click="scrollToContact"
                            class="px-6 md:px-7 py-3 rounded-full relative group w-full sm:w-max flex justify-center"
                        >
                            <span
                                class="absolute inset-0 rounded-3xl group-hover:scale-105 origin-center transition-all ease-in-out bg-primary border-2 border-transparent"
                            ></span>
                            <span
                                class="relative flex items-center justify-center text-white"
                                >Hire Me</span
                            >
                        </button>

                        <button
                            class="border border-primary px-6 md:px-7 py-3 rounded-full relative group w-full sm:w-max flex justify-center"
                        >
                            <div
                                class="hover:scale-105 transition-all ease-in-out flex justify-center items-center relative"
                            >
                                <div class="svg-container">
                                    <svg
                                        class="download-icon"
                                        width="18"
                                        height="22"
                                        viewBox="0 0 18 22"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            class="download-arrow"
                                            d="M9 1v12M13 9L9 13L5 9"
                                            stroke="#f59e0b"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        />
                                        <path
                                            d="M1 17V18C1 18.7956 1.31607 19.5587 1.87868 20.1213C2.44129 20.6839 3.20435 21 4 21H14C14.7956 21 15.5587 20.6839 16.1213 20.1213C16.6839 19.5587 17 18.7956 17 18V17"
                                            stroke="#f59e0b"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        />
                                    </svg>
                                    <div
                                        class="download-loader text-white hidden"
                                    ></div>
                                </div>
                                <a
                                    :href="getResumeUrl()"
                                    @click="handleDownload"
                                    class="pl-2 text-primary"
                                >
                                    Download resume</a
                                >
                            </div>
                        </button>
                    </div>
                </div>
                <div class="lg:h-full md:flex">
                    <div
                        class="flex w-full h-96 min-h-[24rem] lg:min-h-[none] lg:w-full lg:h-full items-center relative"
                    >
                        <div
                            class="absolute z-0 top-1/2 -translate-y-1/2 w-5/6 right-0 h-[calc(80%+20px)] bg-linear-to-tr opacity-25 from-[#570cac] to-primary blur-2xl"
                        ></div>
                        <div
                            class="absolute h-full z-10 p-2 -translate-y-1/2 top-1/2 lg:right-3 md:right-40 sm:right-16 rounded-full shadow-lg border border-primary"
                        >
                            <template v-if="isImageLoading">
                                <div
                                    class="w-full h-full rounded-full bg-gray-700 animate-pulse"
                                ></div>
                            </template>
                            <img
                                v-else
                                :src="profileImage"
                                alt="Hero Picture"
                                width="500"
                                height="auto"
                                class="w-full h-full rounded-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { lazyLoadImage } from "@/utils/imageLoader";
import topPicture from "../assets/top_picture.png";

const profileImage = ref("");
const isImageLoading = ref(true);

onMounted(async () => {
    try {
        console.info("Loading profile image...");
        const loadedImage = await lazyLoadImage(topPicture);
        profileImage.value = loadedImage;
        console.info("Profile image loaded successfully.");
    } catch (error) {
        console.error("Error loading profile image:", error);
        alert("Error: Unable to load profile image.");
    } finally {
        isImageLoading.value = false;
    }
});

const scrollToContact = () => {
    const contactSection = document.querySelector("#contact");
    if (contactSection) {
        contactSection.scrollIntoView({
            behavior: "smooth",
        });
    }
};

const getResumeUrl = () => {
    return `${import.meta.env.BASE_URL}resume.pdf`;
};

const handleDownload = async (e: Event) => {
    e.preventDefault();
    try {
        const response = await fetch(getResumeUrl());
        if (!response.ok) throw new Error("Failed to download resume");

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "resume.pdf";
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
    } catch (error) {
        console.error("Error downloading resume:", error);
    }
};
</script>
