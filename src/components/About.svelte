<script>
    import { onMount } from 'svelte'
    import educationData from '../data/education.json'

    let education = $state([])
    let stats = $state([])

    let isLoading = $state(true)
    let loadError = $state(null)

    /**
     * Derived state for checking if data is ready
     */
    const hasEducation = $derived(education.length > 0)
    const hasStats = $derived(stats.length > 0)
    const isDataReady = $derived(!isLoading && !loadError && hasEducation && hasStats)

    /**
     * Load education and statistics data on a component mount
     */
    onMount(async () => {
        try {
            // Load data from JSON file
            education = educationData.education || []
            stats = educationData.statistics || []

            // Validate data structure
            if (!Array.isArray(education) || !Array.isArray(stats)) {
                return Promise.reject(new Error('Invalid data structure in education.json'))
            }

            isLoading = false
            console.info('📚 About component initialized with data from JSON')
        } catch (error) {
            console.error('Error loading education/statistics data:', error)
            loadError = 'Failed to load education and statistics data'
            isLoading = false
        }
    })

    // Effect to handle data changes for debugging/monitoring
    $effect(() => {
        if (isDataReady) {
            console.info('📊 About component data ready:', {
                educationItems: education.length,
                statsItems: stats.length,
            })
        }
    })

    // Effect for performance monitoring
    $effect(() => {
        if (loadError) {
            console.warn('⚠️ About component encountered an error:', loadError)
        }
    })
</script>

<!-- About section with education history and personal information -->
<section class="section-container relative text-white" id="about">
    <!-- Background decoration element -->
    <div class="absolute inset-x-0 top-0 z-0 flex h-64 items-start">
        <div
            class="from-primary via-secondary h-24 w-64 bg-gradient-to-br to-purple-600 opacity-20 blur-2xl"
        ></div>
    </div>

    <!-- Main content grid with two columns -->
    <div class="relative z-10 items-center gap-8 py-8 md:grid md:grid-cols-2 xl:gap-16">
        {#if isLoading}
            <!-- Loading state -->
            <div class="col-span-2 flex justify-center">
                <div class="text-gray-400">Loading education and statistics...</div>
            </div>
        {:else if loadError}
            <!-- Error state -->
            <div class="col-span-2 text-center">
                <p class="text-red-400">{loadError}</p>
            </div>
        {:else}
            <!-- Education column -->
            <div class="education-section">
                <div class="section-header mb-8">
                    <h2 class="section-title text-left">My Education</h2>
                </div>

                <!-- Education timeline items with staggered animations -->
                <div class="space-y-6">
                    {#each education as educationItem (educationItem.id)}
                        <div
                            class="education-card card group w-full transition-all duration-300 hover:scale-105 md:w-4/5"
                        >
                            <!-- Education details -->
                            <div class="w-full">
                                <h3
                                    class="text-gradient mb-2 text-xl font-semibold uppercase lg:text-2xl"
                                >
                                    {educationItem.School}
                                </h3>

                                <p class="mb-1 font-medium text-gray-200">
                                    {educationItem.Degree}
                                </p>

                                <p class="text-primary text-sm font-medium">
                                    {educationItem.Year}
                                </p>

                                {#if educationItem.description}
                                    <p class="mt-2 text-sm text-gray-400">
                                        {educationItem.description}
                                    </p>
                                {/if}
                            </div>
                        </div>
                    {/each}
                </div>
            </div>

            <!-- Personal bio column -->
            <div class="bio-section mt-8 flex h-full flex-col text-left md:mt-0">
                <div class="section-header mb-6">
                    <h2 class="section-title text-left md:text-center">
                        More
                        <span class="text-gradient">About</span>
                        Me
                    </h2>
                </div>

                <!-- Biography paragraphs (might be added to json later with other text stuff) -->
                <div
                    class="bio-content space-y-4 text-base leading-relaxed text-gray-300 lg:text-lg"
                >
                    <p>
                        As you can see from the website already, I am still only a university
                        student at a highly acclaimed private university called Eduvos. There, I am
                        pursuing my lifelong dream of becoming a Software Engineer by studying for
                        my Bachelor's degree in Information Technology.
                    </p>

                    <p>
                        My journey began with the programming language of C++, however this year
                        I've switched over to C#, which remains my primary language for everything
                        to do with desktop application development. I have also developed a
                        particular interest in database design and enjoys creating efficient data
                        solutions using SQL Server.
                    </p>

                    <p>
                        Outside my coursework, I undertake some other personal hobbies such as video
                        games, hiking and camping. At the same time, I also like to actively work on
                        some personal projects to expand my programming knowledge as you can see in
                        my projects section, where I'm recently learning about web development
                        through the use of Svelte, TypeScript, TailwindCSS and more.
                    </p>

                    <p>
                        I firmly believe in writing clean and maintainable code as I'm constantly
                        seeking to improve my problem-solving skills through practical applications
                        of my learning. In the end, my goal is to develop into a well-rounded
                        software engineer who can contribute meaningfully to challenging projects
                        while continuing to learn and grow in this ever-evolving field.
                    </p>
                </div>

                <!-- Stats cards with sophisticated staggered animations -->
                {#if hasStats}
                    <div class="stats-grid mt-8 grid max-w-lg grid-cols-3 gap-4">
                        {#each stats as stat (stat.id)}
                            <div
                                class="stat-card card text-center transition-all duration-300 hover:scale-105"
                                role="group"
                                aria-labelledby="stat-{stat.id}-value"
                                aria-describedby="stat-{stat.id}-label"
                            >
                                <h3
                                    class="stat-value text-gradient mb-2 text-xl font-bold sm:text-2xl lg:text-3xl"
                                    id="stat-{stat.id}-value"
                                >
                                    {stat.value}
                                </h3>
                                <p
                                    class="stat-label text-xs text-gray-300 sm:text-sm"
                                    id="stat-{stat.id}-label"
                                >
                                    {stat.label}
                                </p>
                            </div>
                        {/each}
                    </div>
                {/if}
            </div>
        {/if}
    </div>
</section>

<style>
    /* Education section styling */
    .education-card {
        background: linear-gradient(135deg, rgba(17, 24, 39, 0.8) 0%, rgba(31, 41, 55, 0.6) 100%);
        border: 1px solid rgba(245, 158, 11, 0.2);
        backdrop-filter: blur(10px);
        padding: 1.5rem;
        border-radius: 1rem;
        position: relative;
        overflow: hidden;
    }

    .education-card::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 2px;
        background: linear-gradient(90deg, var(--color-primary), var(--color-secondary));
        transform: scaleX(0);
        transition: transform 0.3s ease;
    }

    .education-card:hover::before {
        transform: scaleX(1);
    }

    .bio-content p {
        transition: color 0.3s ease;
    }

    .bio-content p:hover {
        color: rgb(229 231 235); /* gray-200 */
    }

    /* Stats cards styling */
    .stat-card {
        background: linear-gradient(135deg, rgba(17, 24, 39, 0.9) 0%, rgba(31, 41, 55, 0.7) 100%);
        border: 1px solid rgba(107, 114, 128, 0.3);
        padding: 1rem 0.5rem;
        position: relative;
        overflow: hidden;
    }

    .stat-card::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(
            135deg,
            rgba(245, 158, 11, 0.1) 0%,
            rgba(236, 72, 153, 0.1) 100%
        );
        opacity: 0;
        transition: opacity 0.3s ease;
    }

    .stat-card:hover::before {
        opacity: 1;
    }

    .stat-value {
        position: relative;
        z-index: 1;
    }

    .stat-label {
        position: relative;
        z-index: 1;
        transition: color 0.3s ease;
    }

    .stat-card:hover .stat-label {
        color: rgb(209 213 219);
    }

    /* Responsive adjustments */
    @media (max-width: 768px) {
        .education-card {
            padding: 1rem;
        }

        .stat-card {
            padding: 0.75rem 0.25rem;
        }

        .stat-value {
            font-size: 1.25rem;
        }
    }

    /* Enhanced focus states for accessibility */
    .stat-card:focus-within {
        outline: 2px solid var(--color-primary);
        outline-offset: 2px;
    }

    /* Print styles */
    @media print {
        .education-card::before,
        .stat-card::before {
            display: none;
        }
    }
</style>
