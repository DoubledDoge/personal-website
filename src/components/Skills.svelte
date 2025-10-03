<script>
    import {onMount} from 'svelte'
    import graduationIcon from '../assets/graduation-icon.svg'
    import skillsData from '../data/skills.json'

    // Import SCSS styles
    import '../styles/components/skills.scss'

    let skills = $state([])
    let experiences = $state([])
    let animatedWidths = $state({})
    let isLoading = $state(true)
    let loadError = $state(null)

    onMount(async () => {
        try {
            skills = skillsData.skills
            experiences = skillsData.experiences

            const iconMap = {
                '/src/assets/graduation-icon.svg': graduationIcon,
            }

            experiences = experiences.map(experience => ({
                ...experience,
                icon: iconMap[experience.icon] || experience.icon,
            }))

            console.info('Skills loaded successfully:', skills.length)
            console.info('Experiences loaded successfully:', experiences.length)

            const initialWidths = {}
            skills.forEach(skill => {
                initialWidths[skill.id] = '0%'
            })
            animatedWidths = initialWidths

            isLoading = false

            setTimeout(() => {
                const targetWidths = {}
                skills.forEach(skill => {
                    targetWidths[skill.id] = `${skill.proficiency}%`
                })
                animatedWidths = targetWidths
            }, 200)
        } catch (error) {
            console.error('Error loading skills data:', error)
            loadError = 'Failed to load skills data'
            isLoading = false
        }
    })
</script>

<section class="skills-section" id="skills">
    {#if isLoading}
        <div class="skills-loading-grid">
            <div class="skills-loading-column">
                <div class="skills-loading-title"></div>
                <div class="skills-loading-list">
                    {#each Array(6).fill(0) as _, i (i)}
                        <div class="skills-loading-item">
                            <div class="skills-loading-header">
                                <div class="skills-loading-name"></div>
                                <div class="skills-loading-percentage"></div>
                            </div>
                            <div class="skills-loading-bar">
                                <div class="skills-loading-progress"></div>
                            </div>
                            <div class="skills-loading-category">
                                <div class="skills-loading-tag"></div>
                            </div>
                        </div>
                    {/each}
                </div>
            </div>

            <div class="experiences-loading-column">
                <div class="experiences-loading-title"></div>
                <div class="experiences-loading-list">
                    <div class="experiences-loading-item">
                        <div class="experiences-loading-icon">
                            <div class="experiences-loading-icon-placeholder"></div>
                        </div>
                        <div class="experiences-loading-content">
                            <div class="experiences-loading-role"></div>
                            <div class="experiences-loading-company"></div>
                            <div class="experiences-loading-date"></div>
                            <div class="experiences-loading-description"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    {:else if loadError}
        <div class="skills-error-container">
            <p class="skills-error-text">{loadError}</p>
            <button
                    type="button"
                    onclick={() => window.location.reload()}
                    class="skills-retry-button"
            >
                Retry Loading
            </button>
        </div>
    {:else}
        <div class="skills-content-grid">
            <div class="skills-column">
                <h2 class="skills-title">My Skills</h2>

                <div class="skills-list">
                    {#each skills as skill (skill.id)}
                        <div class="skill-item">
                            <div class="skill-header">
                                <h4 class="skill-name">
                                    {skill.name}
                                </h4>
                                <span class="skill-percentage">
                                    {skill.proficiency}%
                                </span>
                            </div>

                            <div class="skill-progress-container">
                                <div
                                        class="skill-progress-bar"
                                        style="width: {animatedWidths[skill.id] || '0%'}"
                                ></div>
                            </div>

                            <div class="skill-category-container">
                                <span class="skill-category-tag">
                                    {skill.category}
                                </span>
                            </div>
                        </div>
                    {/each}
                </div>
            </div>

            <div class="experiences-column">
                <h2 class="experiences-title">My Experiences</h2>

                <div class="experiences-list">
                    {#each experiences as experience (experience.id)}
                        <article class="experience-card">
                            <div class="experience-icon-container">
                                <img
                                        src={experience.icon}
                                        alt="{experience.role} icon"
                                        class="experience-icon"
                                        loading="lazy"
                                />
                            </div>

                            <div class="experience-content">
                                <h3 class="experience-role">
                                    {experience.role}
                                </h3>

                                {#if experience.company}
                                    <p class="experience-company">
                                        {experience.company}
                                    </p>
                                {/if}

                                {#if experience.date}
                                    <p class="experience-date">
                                        {experience.date}
                                    </p>
                                {/if}

                                {#if experience.description}
                                    <p class="experience-description">
                                        {experience.description}
                                    </p>
                                {/if}
                            </div>
                        </article>
                    {/each}
                </div>

                <div class="experiences-future-note">
                    <p class="experiences-future-text">More experiences coming soon...</p>
                </div>
            </div>
        </div>
    {/if}
</section>
