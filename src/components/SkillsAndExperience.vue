<template>
  <!-- Skills and experience section with progress bars and timeline -->
  <section class="text-white mt-18" id="skills">
    <!-- Background decoration element -->
    <div class="absolute right-0 top-[110rem] h-full w-full justify-end">
      <span class="flex opacity-20">
        <span class="w-16 h-32 rounded-l-full flex bg-primary blur-2xl"></span>
        <span
          class="w-16 h-32 rounded-r-full flex bg-[#f88fc2] blur-2xl mt-14"
        ></span>
      </span>
    </div>

    <!-- Main content grid -->
    <div
      class="md:grid md:grid-cols-2 gap-8 items-center py-8 px-4 xl:gap-16 xl:px-16"
    >
      <!-- Skills column with progress bars -->
      <div class="mt-4 md:mt-0 text-left flex flex-col z-10 h-full w-[80%]">
        <h2 class="text-4xl font-bold text-white text-left mb-4">
          My
          <span
            class="text-transparent bg-clip-text bg-linear-to-r from-primary to-secondary"
            >Skills</span
          >
        </h2>

        <!-- Individual skill progress bars -->
        <div class="mt-8" v-for="skill in Skills" :key="skill.id">
          <div class="flex items-end justify-between">
            <h4 class="font-semibold uppercase text-white">
              {{ skill.name }}
            </h4>

            <h3 class="text-2xl font-bold text-white">
              {{ skill.width }}
            </h3>
          </div>

          <!-- Progress bar -->
          <div
            class="mt-2 h-1 w-full bg-[#131d30] rounded-full overflow-hidden"
          >
            <div
              class="h-1 rounded-full bg-primary transition-all duration-1000 ease-in-out"
              :style="{ width: animatedWidths[skill.id] }"
            ></div>
          </div>
        </div>
      </div>

      <!-- Experiences column with timeline cards -->
      <div data-aos="flip-left">
        <h2
          class="text-4xl font-bold text-white text-left mb-8 md:text-center md:mt-0 mt-8"
        >
          My Experiences
        </h2>

        <!-- Experience timeline items -->
        <div class="space-y-8 py-8" data-aos="fade-left">
          <div
            v-for="element in Experiences"
            :key="element.id"
            class="flex items-center rounded-xl p-4 bg-[#111a3e] shadow-lg border border-[#1f1641]"
          >
            <!-- Experience icon -->
            <div class="w-1/4">
              <img
                src="https://img.icons8.com/ios-filled/100/ffffff/lawyer.png"
                alt="Business Worker"
              />
            </div>

            <!-- Experience details -->
            <div class="w-3/4 pl-4">
              <h3
                class="text-2xl font-semibold uppercase text-transparent bg-clip-text bg-linear-to-r from-primary to-secondary"
              >
                {{ element.role }}
              </h3>

              <p class="text-white">{{ element.company }}</p>

              <p class="text-white">{{ element.date }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
/**
 * Skills and Experience Component
 *
 * This section showcases the developer's technical skills with visual progress bars
 * and professional experience in a timeline format.
 *
 * Features:
 * - Visual skill proficiency indicators with percentage bars
 * - Professional experience timeline with company details
 * - Responsive layout that adapts to different screen sizes
 * - Animated elements for enhanced visual appeal
 */

import { onMounted, ref } from "vue";

// -----------------------------------------------------
// Skills Data
// -----------------------------------------------------

/**
 * Technical skills with proficiency levels
 * Each skill has a name and width that represents proficiency percentage
 */
const Skills = ref([
  {
    id: 1,
    name: "HTML & CSS",
    width: "55%",
  },
  {
    id: 3,
    name: "C# & .NET",
    width: "80%",
  },
  {
    id: 4,
    name: "JavaScript & TypeScript",
    width: "45%",
  },
  {
    id: 5,
    name: "C++",
    width: "70%",
  },
]);

// -----------------------------------------------------
// Experience Data
// -----------------------------------------------------

/**
 * Professional experience history
 * Currently contains a placeholder entry
 */
const Experiences = ref([
  {
    id: 1,
    role: "None",
    company: "",
    date: "",
  },
]);

const animatedWidths = ref<{ [key: number]: string }>({});
onMounted(() => {
  Skills.value.forEach((skill, idx) => {
    animatedWidths.value[skill.id] = "0%";
    setTimeout(
      () => {
        animatedWidths.value[skill.id] = skill.width;
      },
      300 + idx * 200,
    );
  });
});
</script>
