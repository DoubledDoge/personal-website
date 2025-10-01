<script>
    import {onMount} from 'svelte'
    import educationData from '../data/education.json'
    import textContent from '../data/text-content.json'

    // Import SCSS styles
    import '../styles/components/about.scss'

    let education = $state([])
    let stats = $state([])
    let isLoading = $state(true)
    let loadError = $state(null)

    const hasEducation = $derived(education.length > 0)
    const hasStats = $derived(stats.length > 0)
    const isDataReady = $derived(!isLoading && !loadError && hasEducation && hasStats)

    onMount(async () => {
        try {
            education = educationData.education || []
            stats = educationData.statistics || []

            if (!Array.isArray(education) || !Array.isArray(stats)) {
                return Promise.reject(new Error('Invalid data structure in education.json'))
            }

            isLoading = false
        }
        catch (error) {
            console.error('Error loading education/statistics data:', error)
            loadError = 'Failed to load education and statistics data'
            isLoading = false
        }
    })

    $effect(() => {
        if (isDataReady) {
            console.info('📊 About component data ready:', {
                educationItems: education.length,
                statsItems: stats.length,
            })
        }
    })

    $effect(() => {
        if (loadError) {
            console.warn('⚠️ About component encountered an error:', loadError)
        }
    })
</script>

<section class="about-section" id="about">
    <div class="about-background-decoration">
        <div class="about-gradient-blob"></div>
    </div>

    <div class="about-content-grid">
        {#if isLoading}
            <div class="about-loading-state">
                <div class="text-gray-400">Loading education and statistics...</div>
            </div>
        {:else if loadError}
            <div class="about-error-state">
                <p class="text-red-400">{loadError}</p>
            </div>
        {:else}
            <div class="education-section">
                <div class="section-header mb-8">
                    <h2 class="section-title text-left">My Education</h2>
                </div>

                <div class="education-timeline">
                    {#each education as educationItem (educationItem.id)}
                        <div class="education-card">
                            <div class="education-card-accent"></div>
                            <div class="w-full">
                                <h3 class="education-school-name">
                                    {educationItem.School}
                                </h3>
                                <p class="education-degree">
                                    {educationItem.Degree}
                                </p>
                                <p class="education-year">
                                    {educationItem.Year}
                                </p>
                                {#if educationItem.description}
                                    <p class="education-description">
                                        {educationItem.description}
                                    </p>
                                {/if}
                            </div>
                        </div>
                    {/each}
                </div>
            </div>

            <div class="bio-section">
                <div class="bio-header">
                    <h2 class="bio-title">
                        More <span class="bio-title-accent">About</span> Me
                    </h2>
                </div>
                <div class="bio-content">
                    {#each textContent.about.biography as paragraph, index (index)}
                        <p class="bio-paragraph">
                            {paragraph}
                        </p>
                    {/each}
                </div>

                {#if hasStats}
                    <div class="stats-grid">
                        {#each stats as stat (stat.id)}
                            <div class="stat-card">
                                <div class="stat-card-overlay"></div>
                                <div class="stat-content">
                                    <h3 class="stat-value">
                                        {stat.value}
                                    </h3>
                                    <p class="stat-label">
                                        {stat.label}
                                    </p>
                                </div>
                            </div>
                        {/each}
                    </div>
                {/if}
            </div>
        {/if}
    </div>
</section>