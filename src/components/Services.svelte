<script>
    import {onMount} from 'svelte'
    import servicesData from '../data/services.json'

    // Import SCSS styles
    import '../styles/components/services.scss'

    let services = $state([])
    let isLoading = $state(true)
    let loadError = $state(null)

    onMount(async () => {
        try {
            services = servicesData.services
            console.info('Services loaded successfully:', services.length)
        }
        catch (error) {
            console.error('Error loading services data:', error)
            loadError = 'Failed to load services'
        }
        finally {
            isLoading = false
        }
    })
</script>

<section class="services-section" id="services">
    <div class="section-header">
        <h2 class="section-title">My Services</h2>
        <p class="section-subtitle">
            Specialized skills and services I offer as an aspiring software engineer
        </p>
    </div>

    {#if isLoading}
        <div class="services-loading-container">
            {#each Array(3).fill(0) as _, i (i)}
                <div class="services-loading-skeleton">
                    <div class="services-skeleton-icon"></div>
                    <div class="services-skeleton-content">
                        <div class="services-skeleton-title"></div>
                        <div class="services-skeleton-text-long"></div>
                        <div class="services-skeleton-text-short"></div>
                    </div>
                </div>
            {/each}
        </div>
    {:else if loadError}
        <div class="services-error-container">
            <p class="services-error-text">{loadError}</p>
            <button
                    type="button"
                    onclick={() => window.location.reload()}
                    class="services-retry-button"
            >
                Retry Loading
            </button>
        </div>
    {:else if services.length === 0}
        <div class="services-empty-container">
            <p class="services-empty-text">No services available at the moment.</p>
        </div>
    {:else}
        <div class="services-grid">
            {#each services as service (service.id)}
                <article class="service-card" aria-labelledby="service-{service.id}">
                    <div class="service-icon-container">
                        <img
                                src={service.icon}
                                alt="{service.name} icon"
                                class="service-icon"
                                loading="lazy"
                        />
                    </div>

                    <div class="service-content">
                        <h3 id="service-{service.id}" class="service-title">
                            {service.name}
                        </h3>
                        <p class="service-description">
                            {service.description}
                        </p>
                    </div>
                </article>
            {/each}
        </div>
    {/if}
</section>