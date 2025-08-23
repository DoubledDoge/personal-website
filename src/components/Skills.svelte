<script>
    import { onMount } from 'svelte'
    import skillsData from '../data/skills.json'

    let skills = $state([])
    let experiences = $state([])
    let animatedWidths = $state({})
    let isLoading = $state(true)
    let loadError = $state(null)
    let iconLoadErrors = $state(new Set())

    /**
     * Retry loading failed icons
     */
    function retryIconLoading() {
        iconLoadErrors.clear()
        iconLoadErrors = iconLoadErrors // Trigger reactivity
    }
    /**
     * Initialize component data
     */
    function animateSkillBars() {
        skills.forEach((skill, index) => {
            setTimeout(() => {
                animatedWidths = {
                    ...animatedWidths,
                    [skill.id]: `${skill.proficiency}%`,
                }
            }, index * 150)
        })
    }

    onMount(async () => {
        try {
            // Load data from JSON
            skills = skillsData.skills
            experiences = skillsData.experiences

            console.info('Skills loaded successfully:', skills.length)
            console.info('Experiences loaded successfully:', experiences.length)

            // Initialize animated widths to 0%
            const initialWidths = {}
            skills.forEach(skill => {
                initialWidths[skill.id] = '0%'
            })
            animatedWidths = initialWidths

            isLoading = false

            // Start skill bar animations after a short delay
            setTimeout(animateSkillBars, 300)
        } catch (error) {
            console.error('Error loading skills data:', error)
            loadError = 'Failed to load skills data'
            isLoading = false
        }
    })
</script>

<!-- Skills and experience section with progress bars -->
<section class="section-container relative" id="skills">
    <!-- Background decoration element -->
    <div class="pointer-events-none absolute top-0 right-0 h-full w-full opacity-20">
        <div class="flex justify-end">
            <div class="flex">
                <span class="bg-primary h-32 w-16 rounded-l-full blur-2xl"></span>
                <span class="bg-secondary mt-14 h-32 w-16 rounded-r-full blur-2xl"></span>
            </div>
        </div>
    </div>

    {#if isLoading}
        <!-- Loading state with skeleton -->
        <div class="grid gap-12 md:grid-cols-2 xl:gap-16">
            <!-- Skills loading skeleton -->
            <div class="relative z-10">
                <div class="mb-8 h-8 w-32 animate-pulse rounded bg-gray-700"></div>
                <div class="space-y-6">
                    {#each Array(6).fill(0) as _, i (i)}
                        <div class="skill-item animate-pulse">
                            <div class="mb-2 flex items-end justify-between">
                                <div class="h-5 w-24 rounded bg-gray-700"></div>
                                <div class="h-5 w-12 rounded bg-gray-700"></div>
                            </div>
                            <div class="skill-bar">
                                <div class="h-full w-3/4 rounded-full bg-gray-600"></div>
                            </div>
                            <div class="mt-2">
                                <div class="h-4 w-16 rounded-full bg-gray-700"></div>
                            </div>
                        </div>
                    {/each}
                </div>
            </div>

            <!-- Experiences loading skeleton -->
            <div class="relative z-10">
                <div class="mx-auto mb-8 h-8 w-40 animate-pulse rounded bg-gray-700 md:mx-0"></div>
                <div class="space-y-6">
                    <div class="experience-card animate-pulse">
                        <div class="experience-icon">
                            <div class="h-16 w-16 rounded bg-gray-700"></div>
                        </div>
                        <div class="experience-content">
                            <div class="mb-2 h-6 w-32 rounded bg-gray-700"></div>
                            <div class="mb-1 h-4 w-24 rounded bg-gray-700"></div>
                            <div class="mb-3 h-3 w-20 rounded bg-gray-700"></div>
                            <div class="h-4 w-full rounded bg-gray-700"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    {:else if loadError}
        <!-- Error state -->
        <div class="text-center">
            <p class="mb-4 text-red-400">{loadError}</p>
            <button type="button" onclick={() => window.location.reload()} class="btn-secondary">
                Retry Loading
            </button>
        </div>
    {:else}
        <!-- Main content grid -->
        <div class="grid gap-12 md:grid-cols-2 xl:gap-16">
            <!-- Skills column with progress bars -->
            <div class="relative z-10">
                <h2 class="section-title mb-8 text-left">
                    My <span class="text-gradient">Skills</span>
                </h2>

                <!-- Skills list with individual animations and skill bars -->
                <div class="space-y-6">
                    {#each skills as skill (skill.id)}
                        <div class="skill-item">
                            <!-- Skill header -->
                            <div class="mb-2 flex items-end justify-between">
                                <h4 class="font-semibold text-white uppercase">
                                    {skill.name}
                                </h4>
                                <span class="text-primary text-lg font-bold">
                                    {skill.proficiency}%
                                </span>
                            </div>

                            <!-- Progress bar -->
                            <div class="skill-bar">
                                <div
                                    class="skill-progress"
                                    style="width: {animatedWidths[skill.id] || '0%'}"
                                ></div>
                            </div>

                            <!-- Skill category badge -->
                            <div class="mt-2">
                                <span class="skill-category backdrop-blur-sm">
                                    {skill.category}
                                </span>
                            </div>
                        </div>
                    {/each}
                </div>
            </div>

            <!-- Experiences column with timeline cards -->
            <div class="relative z-10">
                <h2 class="section-title mb-8 text-left md:text-center">My Experiences</h2>

                <!-- Experience timeline with sophisticated animations -->
                <div class="space-y-6">
                    {#each experiences as experience (experience.id)}
                        <article class="experience-card">
                            <!-- Experience icon -->
                            <div class="experience-icon-wrapper">
                                <img
                                    src={experience.icon ||
                                        'https://img.icons8.com/ios-filled/100/ffffff/graduation-cap.png'}
                                    alt="{experience.role} icon"
                                    class="experience-icon-img"
                                    loading="lazy"
                                />
                            </div>

                            <!-- Experience details -->
                            <div class="experience-content">
                                <h3 class="text-gradient mb-2 text-xl font-semibold uppercase">
                                    {experience.role}
                                </h3>

                                {#if experience.company}
                                    <p class="mb-1 font-medium text-gray-300">
                                        {experience.company}
                                    </p>
                                {/if}

                                {#if experience.date}
                                    <p class="mb-3 text-sm text-gray-400">
                                        {experience.date}
                                    </p>
                                {/if}

                                {#if experience.description}
                                    <p class="text-sm leading-relaxed text-gray-400">
                                        {experience.description}
                                    </p>
                                {/if}
                            </div>
                        </article>
                    {/each}
                </div>

                <!-- Icon retry section (only show if there are icon errors) -->
                {#if iconLoadErrors.size > 0}
                    <div class="mt-6 text-center">
                        <p class="mb-2 text-sm text-gray-500">
                            Some icons failed to load. Using fallback icons.
                        </p>
                        <button
                            type="button"
                            onclick={retryIconLoading}
                            class="text-xs text-amber-400 underline hover:text-amber-300"
                        >
                            Retry loading icons
                        </button>
                    </div>
                {/if}

                <!-- Future experiences placeholder -->
                <div class="mt-8 text-center">
                    <p class="text-sm text-gray-500 italic">More experiences coming soon...</p>
                </div>
            </div>
        </div>
    {/if}
</section>

<style>
    .skill-item {
        @apply transition-all duration-300;
        background: linear-gradient(135deg, rgba(17, 24, 39, 0.6) 0%, rgba(31, 41, 55, 0.4) 100%);
        border: 1px solid rgba(107, 114, 128, 0.2);
        backdrop-filter: blur(5px);
        border-radius: var(--radius-lg);
        padding: var(--spacing-4);
    }

    .skill-item:hover {
        transform: translateY(var(--spacing-1));
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        border-color: rgba(245, 158, 11, 0.3);
    }

    /* Progress bar styling */
    .skill-bar {
        @apply w-full overflow-hidden rounded-full;
        background: linear-gradient(90deg, rgba(31, 41, 55, 0.8) 0%, rgba(55, 65, 81, 0.6) 100%);
        border: 1px solid rgba(75, 85, 99, 0.3);
        height: var(--spacing-2);
    }

    .skill-progress {
        @apply h-full rounded-full transition-all;
        background: linear-gradient(90deg, var(--color-primary) 0%, var(--color-secondary) 100%);
        box-shadow: 0 0 10px rgba(245, 158, 11, 0.4);
        transition-duration: 1200ms;
        transition-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }

    .skill-category {
        @apply inline-block rounded-full bg-[var(--color-gray-800/60)] text-[var(--color-gray-400)];
        @apply border border-[var(--color-dark-700/50)];
        padding-inline: var(--spacing-2);
        padding-block: var(--spacing-1);
        font-size: var(--text-xs);
        line-height: var(--tw-leading, var(--text-xs--line-height));
        --tw-font-weight: var(--font-weight-medium);
        font-weight: var(--font-weight-medium);
        @property --tw-font-weight {
            syntax: '*';
            inherits: false;
        }
    }

    .experience-card {
        @apply flex items-start;
        min-height: 120px;
        border-radius: 0.75rem;
        border-width: 1px;
        border-color: rgb(55 65 81 / 0.5);
        background-color: rgb(31 41 55 / 0.5);
        backdrop-filter: blur(8px);
        transition-property: all;
        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        transition-duration: 300ms;
        cursor: pointer;
        box-shadow: var(--shadow-card);
        gap: var(--spacing-4);
        padding: var(--spacing-6);
    }

    .experience-card:hover {
        box-shadow:
            0 15px 35px rgba(0, 0, 0, 0.2),
            0 0 0 1px rgba(245, 158, 11, 0.1),
            0 0 20px rgba(245, 158, 11, 0.1);

        --tw-translate-y: calc(var(--spacing-1) * -1) /* -0.25rem = -4px */;
        translate: var(--tw-translate-x) var(--tw-translate-y);

        @property --tw-translate-x {
            syntax: '*';
            inherits: false;
            initial-value: 0;
        }
        @property --tw-translate-y {
            syntax: '*';
            inherits: false;
            initial-value: 0;
        }
        @property --tw-translate-z {
            syntax: '*';
            inherits: false;
            initial-value: 0;
        }
    }

    .experience-icon-wrapper {
        display: flex;
        align-items: flex-start;
        justify-content: flex-start;
        width: 80px;
        height: 80px;
        min-width: 80px;
        min-height: 80px;
        border-radius: 0.5rem;
        background-color: rgba(31, 41, 55, 0.5);
        border: 1px solid rgba(75, 85, 99, 0.5);
        flex-shrink: 0;
        padding: 12px;
        box-sizing: border-box;
        margin-bottom: 0.5rem;
    }

    .experience-icon-img {
        width: 100% !important;
        height: 100% !important;
        max-width: 56px !important;
        max-height: 56px !important;
        object-fit: contain !important;
        display: block !important;
        opacity: 1 !important;
        filter: brightness(0.9) !important;
        transition: all 0.3s ease !important;
        flex-shrink: 0;
    }

    .experience-card:hover .experience-icon-img {
        filter: brightness(1.1) !important;
        transform: scale(1.1) !important;
    }

    .experience-content {
        @apply flex-1;
    }

    /* Loading skeleton animation */
    @keyframes pulse {
        0%,
        100% {
            opacity: 1;
        }
        50% {
            opacity: 0.5;
        }
    }

    .animate-pulse {
        animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }

    /* Background decoration enhancements */
    .section-container::before {
        content: '';
        position: absolute;
        top: 20%;
        left: -10%;
        width: 30%;
        height: 60%;
        background: radial-gradient(circle, rgba(245, 158, 11, 0.03) 0%, transparent 70%);
        pointer-events: none;
        z-index: 0;
    }

    /* Responsive adjustments */
    @media (max-width: 768px) {
        .experience-card {
            @apply flex-col text-center;
            gap: var(--spacing-3);
        }

        .experience-icon {
            @apply mx-auto;
        }
    }
</style>
