<script>
    import emailjs from '@emailjs/browser'
    import { onMount } from 'svelte'

    import personalWebsiteImg from './assets/personal-website.png'
    import topPicture from './assets/top_picture.png'

    // Import components
    import About from './components/About.svelte'
    import BackToTop from './components/BackToTop.svelte'
    import Contact from './components/Contact.svelte'
    import Footer from './components/Footer.svelte'
    import Hero from './components/Hero.svelte'
    import LoadingSpinner from './components/LoadingSpinner.svelte'
    import Navigation from './components/Navigation.svelte'
    import Projects from './components/Projects.svelte'
    import Services from './components/Services.svelte'
    import Skills from './components/Skills.svelte'

    // Import utilities
    import { preloadImages } from './lib/imagePreloader.js'

    // Import font for use in CSS stylesheets
    import '@fontsource-variable/inter'

    let isLoading = $state(true)
    let loadingError = $state(null)

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
            // Initialize basic services
            const imagePreloadPromise = preloadImages([topPicture, personalWebsiteImg])
            const emailJSPromise = initializeEmailJS()

            await Promise.all([imagePreloadPromise, emailJSPromise])

            console.info('✅ Basic services initialized successfully')

            // Show the app
            hideInitialLoader()

            console.info('✅ App initialization complete')
        } catch (error) {
            console.error('❌ Error during app initialization:', error)
            loadingError = error?.message || 'Unknown initialization error'

            // Still hide loader and show error state
            hideInitialLoader()
        }
    })

    async function initializeEmailJS() {
        try {
            const publicKey = import.meta.env?.VITE_EMAILJS_PUBLIC_KEY

            if (!publicKey) {
                const error = new Error('EmailJS public key not configured')
                console.warn('⚠️ EmailJS initialization failed:', error.message)
                return
            }

            emailjs.init(publicKey)
            console.info('📧 EmailJS initialized successfully')
        } catch (error) {
            console.warn('⚠️ EmailJS initialization failed:', error)
        }
    }

    function hideInitialLoader() {
        isLoading = false

        // Proper type checking for global functions
        if (typeof window !== 'undefined') {
            // Check if a global loader function exists
            if ('hideInitialLoader' in window && typeof window.hideInitialLoader === 'function') {
                window.hideInitialLoader()
                console.info('🎉 App fully loaded and initial loader hidden')

                // Log performance metrics if available
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
            <!-- Navigation -->
            <Navigation />

            <!-- Main content sections -->
            <main>
                <Hero />
                <Services />
                <About />
                <Skills />
                <Projects />
                <Contact />
                <!-- TODO: Consider implementing testimonials section in future update (Might not come in quite some time though) -->
            </main>

            <!-- Footer and utilities -->
            <Footer />
            <BackToTop />
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

    /* Performance optimizations */
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
