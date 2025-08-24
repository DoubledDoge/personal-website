<script>
    import { onMount } from 'svelte'

    // Import images
    import personalWebsiteImg from './assets/personal-website.webp'
    import topPicture from './assets/top_picture.webp'

    // Critical components
    import Hero from './components/Hero.svelte'
    import LoadingSpinner from './components/LoadingSpinner.svelte'
    import Navigation from './components/Navigation.svelte'

    // Import utilities
    import { preloadImages } from './lib/imagePreloader.js'

    // Lazy-loaded components
    let About = $state(null)
    let BackToTop = $state(null)
    let Contact = $state(null)
    let Footer = $state(null)
    let Projects = $state(null)
    let Services = $state(null)
    let Skills = $state(null)

    let isLoading = $state(true)
    let loadingError = $state(null)
    let componentsLoaded = $state(false)
    let emailjsModule = $state(null)

    // Derived state for checking if the app is ready
    const isAppReady = $derived(!isLoading && !loadingError)

    // Derived state for determining loading progress
    const loadingProgress = $derived.by(() => {
        if (loadingError) return 'error'
        if (isLoading) return 'loading'
        return 'ready'
    })

    onMount(async () => {
        console.info('🚀 Initializing Svelte app...')

        try {
            const imagePreloadPromise = preloadImages([topPicture])
            const fontLoadPromise = loadFontsAsync()

            await Promise.all([imagePreloadPromise, fontLoadPromise])

            console.info('✅ Critical resources loaded successfully')

            // Show the app immediately with the hero section
            hideInitialLoader()

            // Lazy load non-critical resources in the background
            await loadNonCriticalResources()

            console.info('✅ App initialization complete')
        } catch (error) {
            console.error('❌ Error during app initialization:', error)
            loadingError = error?.message || 'Unknown initialization error'
            hideInitialLoader()
        }
    })

    async function loadFontsAsync() {
        try {
            await import('@fontsource-variable/inter')
            console.info('🎨 Fonts loaded asynchronously')
        } catch (error) {
            console.warn('⚠️ Font loading failed:', error)
        }
    }

    async function loadNonCriticalResources() {
        try {
            const componentPromises = [
                import('./components/Services.svelte').then(module => {
                    Services = module.default
                }),
                import('./components/About.svelte').then(module => {
                    About = module.default
                }),
                import('./components/Skills.svelte').then(module => {
                    Skills = module.default
                }),
                import('./components/Projects.svelte').then(module => {
                    Projects = module.default
                }),
                import('./components/Contact.svelte').then(module => {
                    Contact = module.default
                }),
                import('./components/Footer.svelte').then(module => {
                    Footer = module.default
                }),
                import('./components/BackToTop.svelte').then(module => {
                    BackToTop = module.default
                }),
            ]

            // Load EmailJS and remaining images in background
            const emailJSPromise = loadEmailJSAsync()
            const remainingImagesPromise = preloadImages([personalWebsiteImg])

            // Wait for all non-critical resources
            await Promise.all([...componentPromises, emailJSPromise, remainingImagesPromise])

            componentsLoaded = true
            console.info('🎯 All non-critical resources loaded')
        } catch (error) {
            console.warn('⚠️ Some non-critical resources failed to load:', error)
            componentsLoaded = true
        }
    }

    async function loadEmailJSAsync() {
        try {
            // Dynamically import EmailJS to avoid blocking the initial render
            const emailjsImport = await import('@emailjs/browser')
            emailjsModule = emailjsImport.default

            const publicKey = import.meta.env?.VITE_EMAILJS_PUBLIC_KEY

            if (!publicKey) {
                console.warn('⚠️ EmailJS public key not configured')
                return
            }

            emailjsModule.init(publicKey)
            console.info('📧 EmailJS initialized asynchronously')
        } catch (error) {
            console.warn('⚠️ EmailJS initialization failed:', error)
        }
    }

    function hideInitialLoader() {
        isLoading = false

        // Proper type checking for global functions
        if (typeof window !== 'undefined') {
            if ('hideInitialLoader' in window && typeof window.hideInitialLoader === 'function') {
                window.hideInitialLoader()
                console.info('🎉 App fully loaded and initial loader hidden')

                if ('getLoadTime' in window && typeof window.getLoadTime === 'function') {
                    console.info(`⚡ Total load time: ${Math.round(window.getLoadTime())}ms`)
                }
            }
        }
    }

    // Effect to handle loading state changes
    $effect(() => {
        if (loadingProgress === 'ready') {
            console.info('🎯 App is now ready for user interaction')
        } else if (loadingProgress === 'error') {
            console.error('💥 App encountered an error during initialization')
        }
    })
</script>

<div class="min-h-screen bg-gray-900">
    {#if loadingProgress === 'loading'}
        <!-- Loading state -->
        <div class="flex min-h-screen items-center justify-center">
            <LoadingSpinner />
        </div>
    {:else if loadingProgress === 'error'}
        <!-- Error state -->
        <div class="flex min-h-screen flex-col items-center justify-center px-6 text-center">
            <div class="max-w-md">
                <h1 class="mb-4 text-2xl font-bold text-red-400">Oops! Something went wrong</h1>
                <p class="mb-6 text-gray-400">
                    We encountered an error while loading the website. Please try refreshing the
                    page.
                </p>
                <button
                    onclick={() => window.location.reload()}
                    class="rounded-lg bg-amber-500 px-6 py-2 font-semibold text-gray-900 transition-colors duration-200 hover:bg-amber-600"
                >
                    Refresh Page
                </button>
                <p class="mt-4 text-xs text-gray-500">
                    Error: {loadingError}
                </p>
            </div>
        </div>
    {:else if isAppReady}
        <!-- Main application content -->
        <div>
            <Navigation />
            <!-- Main content sections -->
            <main>
                <Hero />

                {#if componentsLoaded}
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
                        <Contact {emailjsModule} />
                    {/if}
                {:else}
                    <!-- Placeholder for lazy-loaded content -->
                    <div class="flex min-h-screen items-center justify-center">
                        <div class="text-center text-gray-400">
                            <div class="mb-4 text-sm">Loading additional content...</div>
                            <div class="h-2 w-48 overflow-hidden rounded bg-gray-700">
                                <div class="h-full animate-pulse bg-amber-500"></div>
                            </div>
                        </div>
                    </div>
                {/if}
            </main>

            <!-- Footer and utilities -->
            {#if componentsLoaded}
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

<style>
    :global(*) {
        /* Custom scrollbar styling */
        scrollbar-width: thin;
        scrollbar-color: #6b7280 #374151;
    }

    /* Webkit browsers scrollbar */
    :global(*::-webkit-scrollbar) {
        width: 8px;
        height: 8px;
    }

    :global(*::-webkit-scrollbar-track) {
        background: #374151;
        border-radius: 4px;
    }

    :global(*::-webkit-scrollbar-thumb) {
        background: #6b7280;
        border-radius: 4px;
        transition: background 0.2s ease;
    }

    :global(*::-webkit-scrollbar-thumb:hover) {
        background: #9ca3af;
    }

    /* Smooth transitions for better UX */
    :global(*) {
        transition:
            background-color 0.2s ease,
            border-color 0.2s ease,
            color 0.2s ease,
            transform 0.2s ease;
    }

    /* Enhanced focus styles for accessibility */
    :global(*:focus) {
        outline: 2px solid #f59e0b;
        outline-offset: 2px;
    }

    :global(img) {
        content-visibility: auto;
        height: auto;
    }

    /* Prevent flash of unstyled content */
    :global(body) {
        margin: 0;
        padding: 0;
        background-color: #111827;
        font-family:
            system-ui,
            -apple-system,
            'Segoe UI',
            sans-serif;
        width: 100%;
        overflow-x: hidden;
    }

    /* Ensure proper layout flow */
    main {
        position: relative;
        z-index: 1;
    }

    /* Loading state styling */
    .min-h-screen {
        min-height: 100dvh;
    }

    /* Fallback for browsers that don't support dvh */
    @supports not (height: 100dvh) {
        .min-h-screen {
            min-height: 100vh;
        }
    }
</style>
