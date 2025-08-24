<script>
    import { onMount } from 'svelte'
    import cPlusPlusUniversityImg from '../assets/cPlusPlus-university.webp'
    import cSharpUniversityImg from '../assets/cSharp-university.webp'
    import personalWebsiteImg from '../assets/personal-website.webp'
    import projectsData from '../data/projects.json'
    import { preloadImages } from '../lib/imagePreloader.js'
    import LoadingSpinner from './LoadingSpinner.svelte'

    let projects = $state([])
    let categories = $state([])
    let selectedCategory = $state('All')
    let loadedImages = $state(new Map())
    let isLoading = $state(true)
    let loadError = $state(null)

    /**
     * Filter projects based on the selected category
     */
    let filteredProjects = $derived(
        selectedCategory === 'All'
            ? projects
            : projects.filter(project => project.category === selectedCategory)
    )

    onMount(async () => {
        try {
            // Load project data from JSON
            projects = projectsData.projects
            categories = projectsData.categories

            // Map image imports to project data
            const imageMap = {
                '/src/assets/personal-website.png': personalWebsiteImg,
                '/src/assets/cSharp-university.png': cSharpUniversityImg,
                '/src/assets/cPlusPlus-university.png': cPlusPlusUniversityImg,
            }

            // Update projects with actual image imports
            projects = projects.map(project => ({
                ...project,
                image: imageMap[project.image] || project.image,
            }))

            // Preload all project images
            const imageSources = projects.map(project => project.image)
            await preloadImages(imageSources)

            // Create the loaded images map for seamless display
            imageSources.forEach(src => {
                loadedImages.set(src, src)
            })

            isLoading = false
        } catch (error) {
            console.error('Error loading projects data:', error)
            loadError = 'Failed to load projects'
            isLoading = false
        }
    })

    /** @param {string} category */
    function handleCategorySelect(category) {
        selectedCategory = category
    }
</script>

<!-- Projects portfolio section with filterable gallery -->
<section class="section-container" id="projects">
    <!-- Section header with title and category filters -->
    <div class="section-header">
        <div class="mb-8 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <h2 class="section-title mb-0">My Latest Projects</h2>

            <!-- Project category filter buttons -->
            <div class="flex flex-wrap gap-3">
                {#each categories as category (category)}
                    <button
                        onclick={() => handleCategorySelect(category)}
                        class="btn-filter {selectedCategory === category ? 'active' : ''}"
                    >
                        {category}
                    </button>
                {/each}
            </div>
        </div>
    </div>

    {#if isLoading}
        <!-- Loading state -->
        <div class="flex justify-center py-20">
            <LoadingSpinner label="Loading projects" />
        </div>
    {:else if loadError}
        <!-- Error state -->
        <div class="text-center">
            <p class="text-error">{loadError}</p>
        </div>
    {:else}
        <!-- Projects grid -->
        <div class="grid-auto-fit gap-8">
            {#each filteredProjects as project (project.id)}
                <!-- Individual project card with staggered animation -->
                <article class="project-card group">
                    <!-- Project image/thumbnail -->
                    <div
                        class="project-image"
                        style="background-image: url({loadedImages.get(project.image) ||
                            project.image})"
                    >
                        <!-- Hover overlay with action buttons -->
                        <div class="project-overlay">
                            <div class="flex space-x-4">
                                <!-- Live Demo Button (conditional) -->
                                {#if project.webURL}
                                    <a
                                        href={project.webURL}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        class="project-action-btn"
                                        title="View Live Demo"
                                    >
                                        <!-- Globe/Web Icon -->
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke-width="1.5"
                                            stroke="currentColor"
                                            class="project-icon"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
                                            />
                                        </svg>
                                    </a>
                                {/if}

                                <!-- GitHub Button (conditional) -->
                                {#if project.gitURL}
                                    <a
                                        href={project.gitURL}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        class="project-action-btn"
                                        title="View Source Code"
                                    >
                                        <!-- GitHub Icon -->
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            class="project-icon"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                        >
                                            <path
                                                d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                                            />
                                        </svg>
                                    </a>
                                {/if}
                            </div>
                        </div>
                    </div>

                    <!-- Project information card -->
                    <div class="project-content">
                        <!-- Project title -->
                        <h3 class="text-gradient mb-3 text-lg font-semibold uppercase lg:text-xl">
                            {project.title}
                        </h3>

                        <!-- Project description -->
                        <p class="mb-4 leading-relaxed text-gray-400">
                            {project.description}
                        </p>

                        <!-- Technologies used tags -->
                        <div class="flex flex-wrap gap-2">
                            {#each project.technologies as technology (technology)}
                                <span class="tech-tag">
                                    {technology}
                                </span>
                            {/each}
                        </div>
                    </div>
                </article>
            {/each}
        </div>
    {/if}
</section>

<style>
    .btn-filter {
        border-radius: 9999px;
        border-width: 2px;
        border-color: var(--color-dark-500);
        padding: 0.5rem 1rem;
        font-weight: 500;
        color: rgb(209, 213, 219);
        cursor: pointer;
        transition-property: all;
        transition-duration: 300ms;
        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    }

    .btn-filter:hover {
        border-color: var(--color-primary);
        color: var(--color-primary);
    }

    .btn-filter:focus {
        box-shadow: 0 0 0 4px rgba(245, 158, 11, 0.3);
    }

    .project-card {
        border-radius: 0.75rem;
        border-width: 1px;
        border-color: rgb(55 65 81 / 0.5);
        background-color: rgb(31 41 55 / 0.5);
        padding: 1.5rem;
        backdrop-filter: blur(8px);
        transition-property: all;
        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        transition-duration: 300ms;
        box-shadow: var(--shadow-card);
        overflow: hidden;
        display: flex;
        flex-direction: column;
        height: 100%;
    }

    .project-card:hover {
        border-color: rgb(245 158 11 / 0.3);
        transform: translateY(-0.5rem);
        box-shadow:
            0 25px 50px -12px rgba(0, 0, 0, 0.4),
            0 0 0 1px rgba(245, 158, 11, 0.1),
            0 0 30px rgba(245, 158, 11, 0.1);
    }

    .project-image {
        position: relative;
        height: 13rem;
        background-size: cover;
        background-position: center;
        border-radius: 0.75rem 0.75rem 0 0;
    }

    @media (min-width: 768px) {
        .project-image {
            height: 16rem;
        }
    }

    .project-overlay {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: rgb(17 24 39 / 0.8);
        opacity: 0;
        transition-property: all;
        transition-duration: 500ms;
        backdrop-filter: blur(4px);
    }

    .project-card:hover .project-overlay {
        opacity: 1;
    }

    .project-action-btn {
        position: relative;
        height: 3.5rem;
        width: 3.5rem;
        border-radius: 9999px;
        border-width: 2px;
        border-color: var(--color-dark-400);
        transition-property: all;
        transition-duration: 300ms;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .project-action-btn:hover {
        border-color: var(--color-primary);
        background-color: rgba(245, 158, 11, 0.1);
    }

    .project-action-btn:focus {
        box-shadow: 0 0 0 4px rgba(245, 158, 11, 0.3);
    }

    .project-action-btn:hover .project-icon {
        color: var(--color-primary);
        transform: scale(1.1);
    }

    .project-icon {
        height: 2rem;
        width: 2rem;
        color: rgb(156, 163, 175);
        transition-property: all;
        transition-duration: 300ms;
    }

    .project-content {
        flex: 1;
        padding: 1.5rem;
        background: linear-gradient(135deg, rgba(17, 24, 39, 0.9) 0%, rgba(31, 41, 55, 0.8) 100%);
    }

    .tech-tag {
        border-radius: 9999px;
        background-color: rgba(31, 41, 55, 0.8);
        padding: 0.25rem 0.75rem;
        font-size: 0.75rem;
        font-weight: 500;
        color: rgb(209, 213, 219);
        border: 1px solid rgba(75, 85, 99, 0.5);
        backdrop-filter: blur(4px);
        transition-property: all;
        transition-duration: 300ms;
    }

    .tech-tag:hover {
        background-color: rgba(55, 65, 81, 0.8);
        color: white;
    }

    /* Responsive adjustments */
    @media (max-width: 768px) {
        .project-image {
            height: 12rem;
        }
    }
</style>
