<script lang="ts">
    import type { Component } from 'svelte'
    import { onMount } from 'svelte'
    import personalWebsiteImg from '$assets/personal-website.webp'
    import topPicture from '$assets/top_picture.webp'
    import Hero from '$components/Hero.svelte'
    import LoadingSpinner from '$components/LoadingSpinner.svelte'
    import Navigation from '$components/Navigation.svelte'
    import { loadEmailJSAsync } from '$lib/emailUtils'
    import { preloadImages } from '$lib/imagePreloader'
    import { loadStructuredData } from '$lib/structuredData'
    import '$styles/globals.scss'
    import '$styles/components/app.scss'

    interface LoadingState {
        isInitialLoading: boolean
        areComponentsLoaded: boolean
        isEmailJSReady: boolean
        hasError: boolean
    }

    interface WindowWithLoaderAPI extends Window {
        hideInitialLoader?: () => void
        getLoadTime?: () => number
    }

    let loadingState = $state<LoadingState>({
        isInitialLoading: true,
        areComponentsLoaded: false,
        isEmailJSReady: false,
        hasError: false,
    })

    let About = $state<Component | null>(null)
    let BackToTop = $state<Component | null>(null)
    let Contact = $state<Component | null>(null)
    let Footer = $state<Component | null>(null)
    let Projects = $state<Component | null>(null)
    let Services = $state<Component | null>(null)
    let Skills = $state<Component | null>(null)

    const isAppReady = $derived(!loadingState.isInitialLoading && !loadingState.hasError)
    const canShowLazyContent = $derived(loadingState.areComponentsLoaded)

    const loadingStatus = $derived.by((): 'loading' | 'ready' | 'error' => {
        if (loadingState.hasError) return 'error'
        if (loadingState.isInitialLoading) return 'loading'
        return 'ready'
    })

    const COMPONENT_IMPORTS = {
        Services: () => import('./components/Services.svelte'),
        About: () => import('./components/About.svelte'),
        Skills: () => import('./components/Skills.svelte'),
        Projects: () => import('./components/Projects.svelte'),
        Contact: () => import('./components/Contact.svelte'),
        Footer: () => import('./components/Footer.svelte'),
        BackToTop: () => import('./components/BackToTop.svelte'),
    } as const

    onMount(async (): Promise<void> => {
        console.info('🚀 Initializing Svelte app...')

        try {
            await loadCriticalResources()
            hideInitialLoader()
            loadNonCriticalResources().catch((error: Error) => {
                console.warn('⚠️ Some non-critical resources failed to load:', error)
                loadingState.areComponentsLoaded = true
            })
            console.info('✅ App initialization complete')
        } catch (error: unknown) {
            handleInitializationError(error)
        }
    })

    async function loadCriticalResources(): Promise<void> {
        try {
            const criticalTasks = [await preloadImages([topPicture]), await loadStructuredData()]

            await Promise.all(criticalTasks)
            console.info('✅ Critical resources loaded successfully')
        } catch (error: unknown) {
            throw new Error(`Failed to load critical resources: ${getErrorMessage(error)}`)
        }
    }

    async function loadNonCriticalResources(): Promise<void> {
        try {
            const [componentsResult, emailJSResult] = await Promise.allSettled([
                loadAllComponents(),
                loadEmailJS(),
                preloadImages([personalWebsiteImg]),
            ])

            if (componentsResult.status === 'fulfilled') {
                loadingState.areComponentsLoaded = true
            } else {
                console.warn('Component loading failed:', componentsResult.reason)
                loadingState.areComponentsLoaded = true
            }

            if (emailJSResult.status === 'fulfilled') {
                loadingState.isEmailJSReady = true
            } else {
                console.warn('EmailJS loading failed:', emailJSResult.reason)
            }

            console.info('🎯 Non-critical resources loaded')
        } catch (error: unknown) {
            console.warn('⚠️ Error in non-critical resource loading:', getErrorMessage(error))
            loadingState.areComponentsLoaded = true
        }
    }

    async function loadAllComponents(): Promise<void> {
        try {
            const componentResults = await Promise.allSettled([
                COMPONENT_IMPORTS.Services().then(module => {
                    Services = module.default
                }),
                COMPONENT_IMPORTS.About().then(module => {
                    About = module.default
                }),
                COMPONENT_IMPORTS.Skills().then(module => {
                    Skills = module.default
                }),
                COMPONENT_IMPORTS.Projects().then(module => {
                    Projects = module.default
                }),
                COMPONENT_IMPORTS.Contact().then(module => {
                    Contact = module.default
                }),
                COMPONENT_IMPORTS.Footer().then(module => {
                    Footer = module.default
                }),
                COMPONENT_IMPORTS.BackToTop().then(module => {
                    BackToTop = module.default
                }),
            ])

            componentResults.forEach((result, index) => {
                const componentName = Object.keys(COMPONENT_IMPORTS)[index]
                if (result.status === 'rejected') {
                    console.warn(`⚠️ Failed to load component ${componentName}:`, result.reason)
                }
            })
        } catch (error: unknown) {
            console.error('❌ Critical error loading components:', getErrorMessage(error))
            throw error
        }
    }

    async function loadEmailJS(): Promise<void> {
        try {
            const emailModule = await loadEmailJSAsync()
            if (emailModule) {
                loadingState.isEmailJSReady = true
                console.info('✅ EmailJS loaded successfully')
            } else {
                console.warn('⚠️ EmailJS module returned null')
            }
        } catch (error: unknown) {
            console.error('❌ Failed to load EmailJS:', getErrorMessage(error))
            throw error
        }
    }

    function handleInitializationError(error: unknown): void {
        const errorMessage = getErrorMessage(error)
        console.error('❌ Critical error during app initialization:', errorMessage)

        loadingState.hasError = true
        loadingState.isInitialLoading = false

        hideInitialLoader()
    }

    function getErrorMessage(error: unknown): string {
        if (error instanceof Error) {
            return error.message
        }
        if (typeof error === 'string') {
            return error
        }
        return 'Unknown error occurred'
    }

    function hideInitialLoader(): void {
        loadingState.isInitialLoading = false

        if (typeof window === 'undefined') return

        const windowWithAPI = window as WindowWithLoaderAPI

        if (typeof windowWithAPI.hideInitialLoader === 'function') {
            windowWithAPI.hideInitialLoader()
            console.info('🎉 App fully loaded and initial loader hidden')

            if (typeof windowWithAPI.getLoadTime === 'function') {
                const loadTime = windowWithAPI.getLoadTime()
                console.info(`⚡ Total load time: ${Math.round(loadTime)}ms`)
            }
        }
    }

    $effect((): void => {
        if (loadingStatus === 'ready') {
            console.info('🎯 App is now ready for user interaction')
        }
    })
</script>

<div class="app-container">
    {#if loadingStatus === 'loading'}
        <div class="app-loading">
            <LoadingSpinner />
        </div>
    {:else if loadingStatus === 'error'}
        <div class="app-error">
            <h1>Something went wrong</h1>
            <p>Please refresh the page to try again.</p>
            <button onclick={() => window.location.reload()}>Refresh Page</button>
        </div>
    {:else if isAppReady}
        <div>
            <Navigation />
            <main class="app-main">
                <Hero />
                {#if canShowLazyContent}
                    {#if Services}
                        <Services />
                    {/if}
                    {#if About}
                        <About />
                    {/if}
                    {#if Skills}
                        <Skills />
                    {/if}
                    {#if Projects}
                        <Projects />
                    {/if}
                    {#if Contact}
                        <Contact emailjsReady={loadingState.isEmailJSReady} />
                    {/if}
                {:else}
                    <div class="app-lazy-loading">
                        <div class="app-lazy-loading__container">
                            <div class="app-lazy-loading__text">Loading additional content...</div>
                            <div class="app-lazy-loading-progress">
                                <div class="app-lazy-loading-bar"></div>
                            </div>
                        </div>
                    </div>
                {/if}
            </main>

            {#if canShowLazyContent}
                {#if Footer}
                    <Footer />
                {/if}
                {#if BackToTop}
                    <BackToTop />
                {/if}
            {/if}
        </div>
    {/if}
</div>
