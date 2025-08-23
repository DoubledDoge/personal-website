<script>
    import { onMount } from 'svelte'
    import servicesData from '../data/services.json'

    let services = $state([])
    let isLoading = $state(true)
    let loadError = $state(null)
    let iconLoadErrors = $state(new Set())

    /**
     * Load services data on component mount
     */
    onMount(async () => {
        try {
            // Load services from JSON data
            services = servicesData.services
            console.info('Services loaded successfully:', services.length)
        } catch (error) {
            console.error('Error loading services data:', error)
            loadError = 'Failed to load services'
        } finally {
            isLoading = false
        }
    })
    /**
     * Retry loading failed icons
     */
    function retryIconLoading() {
        iconLoadErrors.clear()
        iconLoadErrors = iconLoadErrors // Trigger reactivity
    }
</script>

<!-- Services section showcasing professional capabilities -->
<section class="section-container" id="services">
    <div class="section-header">
        <h2 class="section-title">My Services</h2>
        <p class="section-subtitle">
            Specialized skills and services I offer as an aspiring software engineer
        </p>
    </div>

    {#if isLoading}
        <!-- Loading state with skeleton -->
        <div class="grid-auto-fit gap-8">
            {#each Array(3).fill(0) as _, i (i)}
                <div class="card animate-pulse">
                    <div class="mx-auto h-24 w-24 rounded-full bg-gray-700"></div>
                    <div class="mt-6 space-y-3 text-center">
                        <div class="mx-auto h-6 w-32 rounded bg-gray-700"></div>
                        <div class="mx-auto h-4 w-48 rounded bg-gray-700"></div>
                        <div class="mx-auto h-4 w-40 rounded bg-gray-700"></div>
                    </div>
                </div>
            {/each}
        </div>
    {:else if loadError}
        <!-- Error state with retry option -->
        <div class="text-center">
            <p class="mb-4 text-red-400">{loadError}</p>
            <button type="button" onclick={() => window.location.reload()} class="btn-secondary">
                Retry Loading
            </button>
        </div>
    {:else if services.length === 0}
        <!-- Empty state -->
        <div class="text-center">
            <p class="text-gray-400">No services available at the moment.</p>
        </div>
    {:else}
        <!-- Services cards grid with staggered animations -->
        <div class="grid-auto-fit gap-8">
            {#each services as service (service.id)}
                <!-- Individual service card with proper staggered delay -->
                <article
                    class="card-interactive group cursor-default"
                    aria-labelledby="service-{service.id}"
                >
                    <!-- Service icon -->
                    <div
                        class="service-icon-container mx-auto flex h-24 w-24 items-center justify-center xl:h-28 xl:w-28"
                    >
                        <img
                            src={service.icon}
                            alt="{service.name} icon"
                            class="service-icon h-20 w-20 transition-transform duration-300 group-hover:scale-110"
                            loading="lazy"
                        />
                    </div>

                    <!-- Service title and description -->
                    <div class="mt-6 text-center">
                        <h3
                            id="service-{service.id}"
                            class="text-gradient mb-4 text-lg font-semibold uppercase lg:text-xl"
                        >
                            {service.name}
                        </h3>
                        <p
                            class="text-gray-400 transition-colors duration-300 group-hover:text-gray-300"
                        >
                            {service.description}
                        </p>
                    </div>
                </article>
            {/each}
        </div>

        <!-- Debug/Retry section (only show if there are icon errors) -->
        {#if iconLoadErrors.size > 0}
            <div class="mt-8 text-center">
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
    {/if}
</section>

<style>
    .service-icon-container {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    :global(.card-interactive) {
        background: linear-gradient(135deg, rgba(17, 24, 39, 0.8) 0%, rgba(31, 41, 55, 0.6) 100%);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(107, 114, 128, 0.2);
        position: relative;
        overflow: hidden;
    }

    :global(.card-interactive:hover) {
        box-shadow:
            0 10px 25px -5px rgba(0, 0, 0, 0.25),
            0 0 0 1px rgba(245, 158, 11, 0.1),
            0 0 20px rgba(245, 158, 11, 0.1);
    }

    .service-icon {
        filter: brightness(0.9);
        transition: all 0.3s ease;
        display: block !important;
        opacity: 1;
    }

    :global(.card-interactive:hover) .service-icon {
        filter: brightness(1.1);
        transform: scale(1.1);
    }

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

    /* Enhanced grid layout */
    :global(.grid-auto-fit) {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 2rem;
    }

    @media (max-width: 640px) {
        :global(.grid-auto-fit) {
            grid-template-columns: 1fr;
        }
    }
</style>
