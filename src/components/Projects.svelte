<script>
    import {onMount} from 'svelte'
    import androidImg from '../assets/android-university.webp'
    import cPlusPlusUniversityImg from '../assets/cPlusPlus-university.webp'
    import cSharpUniversityImg from '../assets/cSharp-university.webp'
    import personalWebsiteImg from '../assets/personal-website.webp'
    import projectsData from '../data/projects.json'
    import {preloadImages} from '../lib/imagePreloader.js'
    import LoadingSpinner from './LoadingSpinner.svelte'

    // Import SCSS styles
    import '../styles/components/projects.scss'

    let projects = $state([])
    let categories = $state([])
    let selectedCategory = $state('All')
    let loadedImages = $state(new Map())
    let isLoading = $state(true)
    let loadError = $state(null)

    let filteredProjects = $derived(
        selectedCategory === 'All'
            ? projects
            : projects.filter(project => project.category === selectedCategory)
    )

    const getFilterButtonClasses = category => {
        let classes = ['projects-filter-button']
        classes.push(selectedCategory === category ? 'active' : 'inactive')
        return classes.join(' ')
    }

    onMount(async () => {
        try {
            projects = projectsData.projects
            categories = projectsData.categories

            const imageMap = {
                '/src/assets/personal-website.webp': personalWebsiteImg,
                '/src/assets/cSharp-university.webp': cSharpUniversityImg,
                '/src/assets/cPlusPlus-university.webp': cPlusPlusUniversityImg,
                '/src/assets/android-university.webp': androidImg,
            }

            projects = projects.map(project => ({
                ...project,
                image: imageMap[project.image] || project.image,
            }))

            const imageSources = projects.map(project => project.image)
            await preloadImages(imageSources)

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

    function handleCategorySelect(category) {
        selectedCategory = category
    }
</script>

<section class="projects-section" id="projects">
    <div class="projects-header">
        <div class="projects-header-content">
            <h2 class="projects-title">My Latest Projects</h2>

            <div class="projects-filter-container">
                {#each categories as category (category)}
                    <button
                        onclick={() => handleCategorySelect(category)}
                        class={getFilterButtonClasses(category)}
                    >
                        {category}
                    </button>
                {/each}
            </div>
        </div>
    </div>

    {#if isLoading}
        <div class="projects-loading-container">
            <LoadingSpinner label="Loading projects" />
        </div>
    {:else if loadError}
        <div class="projects-error-container">
            <p class="projects-error-text">{loadError}</p>
        </div>
    {:else}
        <div class="projects-grid">
            {#each filteredProjects as project (project.id)}
                <article class="project-card">
                    <div
                        class="project-image"
                        style="background-image: url({loadedImages.get(project.image) ||
                            project.image})"
                    >
                        <div class="project-overlay">
                            <div class="project-actions">
                                {#if project.webURL}
                                    <a
                                        href={project.webURL}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        class="project-action-button"
                                        title="View Live Demo"
                                        aria-label="View Live Demo"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            stroke-width="1.5"
                                            stroke="currentColor"
                                            class="project-action-icon"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
                                            />
                                        </svg>
                                    </a>
                                {/if}

                                {#if project.gitURL}
                                    <a
                                        href={project.gitURL}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        class="project-action-button"
                                        title="View Source Code"
                                        aria-label="View Source Code"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            class="project-action-icon"
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

                    <div class="project-content">
                        <h3 class="project-title">
                            {project.title}
                        </h3>

                        <p class="project-description">
                            {project.description}
                        </p>

                        <div class="project-technologies">
                            {#each project.technologies as technology (technology)}
                                <span class="project-tech-tag">
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
