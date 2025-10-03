<script>
    import {onMount} from 'svelte'
    import educationData from '../data/education.json'
    import textContent from '../data/text-content.json'

    // Import SCSS styles
    import '../styles/components/about.scss'

    let education = $state([])
    let stats = $state([])
    const hasStats = $derived(stats.length > 0)

    onMount(async () => {
        try {
            education = educationData.education || []
            stats = educationData.statistics || []

            if (!Array.isArray(education) || !Array.isArray(stats)) {
                return Promise.reject(new Error('Invalid data structure in education.json'))
            }
        }
        catch (error) {
            console.error('Error loading education/statistics data:', error)
        }
    })
</script>

<section class="about-section" id="about">
    <div class="about-content-grid">
        <div class="education-section">
            <div class="section-header mb-8">
                <h2 class="education-title">My Education</h2>
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
    </div>
</section>
