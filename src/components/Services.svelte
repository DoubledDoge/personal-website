<script lang="ts">
    import { onMount } from 'svelte'
    import codeIcon from '$assets/code-icon.svg'
    import cSharpIcon from '$assets/cSharp-icon.svg'
    import databaseIcon from '$assets/database-icon.svg'
    import servicesData from '$data/services.json'
    import '$styles/components/services.scss'

    interface Service {
        id: number
        icon: string
        name: string
        description: string
    }

    type IconMap = Record<string, string>

    let services: Service[] = $state([])
    let hasServices: boolean = $derived(services.length > 0)

    onMount(async (): Promise<void> => {
        try {
            services = servicesData.services

            const iconMap: IconMap = {
                '/src/assets/cSharp-icon.svg': cSharpIcon,
                '/src/assets/database-icon.svg': databaseIcon,
                '/src/assets/code-icon.svg': codeIcon,
            }

            services = services.map(
                (service: Service): Service => ({
                    ...service,
                    icon: iconMap[service.icon] || service.icon,
                })
            )
        } catch (error: unknown) {
            console.error('Error loading services data:', error)
        }
    })
</script>

<section class="services-section" id="services">
    <div class="section-header">
        <h2 class="services-title">My Services</h2>
        <p class="services-subtitle">
            Specialized skills and services I offer as an aspiring software engineer
        </p>
    </div>
    {#if !hasServices}
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
