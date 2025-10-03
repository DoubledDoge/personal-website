<script>
    import {onMount} from 'svelte'
    import personalWebsiteImg from './assets/personal-website.webp'
    import topPicture from './assets/top_picture.webp'
    import Hero from './components/Hero.svelte'
    import LoadingSpinner from './components/LoadingSpinner.svelte'
    import Navigation from './components/Navigation.svelte'
    import {loadEmailJSAsync} from './lib/emailUtils.js'
    import {preloadImages} from './lib/imagePreloader.js'
    import {loadStructuredData} from './lib/structuredData.js'

    // Import SCSS styles
    import './styles/globals.scss'
    import './styles/components/app.scss'

    let About = $state(null)
    let BackToTop = $state(null)
    let Contact = $state(null)
    let Footer = $state(null)
    let Projects = $state(null)
    let Services = $state(null)
    let Skills = $state(null)
    let isLoading = $state(true)
    let componentsLoaded = $state(false)
    let emailjsReady = $state(false)

    const isAppReady = $derived(!isLoading)

    const loadingProgress = $derived.by(() => {
        if (isLoading) return 'loading'
        return 'ready'
    })

    onMount(async () => {
        console.info('🚀 Initializing Svelte app...')

        try {
            const imagePreloadPromise = preloadImages([topPicture])
            await Promise.all([imagePreloadPromise])
            console.info('✅ Critical resources loaded successfully')
            hideInitialLoader()
            await loadStructuredData()
            await loadNonCriticalResources()
            console.info('✅ App initialization complete')
        }
        catch (error) {
            console.error('❌ Error during app initialization:', error)
            hideInitialLoader()
        }
    })

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

            const emailJSPromise = loadEmailJSAsync().then(module => {
                emailjsReady = !!module
                return module
            })
            const remainingImagesPromise = preloadImages([personalWebsiteImg])

            await Promise.all([...componentPromises, emailJSPromise, remainingImagesPromise])
            componentsLoaded = true
            console.info('🎯 All non-critical resources loaded')
        }
        catch (error) {
            console.warn('⚠️ Some non-critical resources failed to load:', error)
            componentsLoaded = true
        }
    }

    function hideInitialLoader() {
        isLoading = false
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

    $effect(() => {
        if (loadingProgress === 'ready') {
            console.info('🎯 App is now ready for user interaction')
        }
    })
</script>

<div class="app-container">
    {#if loadingProgress === 'loading'}
        <div class="app-loading">
            <LoadingSpinner/>
        </div>
    {:else if isAppReady}
        <div>
            <Navigation/>
            <main class="app-main">
                <Hero/>
                {#if componentsLoaded}
                    {#if Services}
                        <Services/>
                    {/if}
                    {#if About}
                        <About/>
                    {/if}
                    {#if Skills}
                        <Skills/>
                    {/if}
                    {#if Projects}
                        <Projects/>
                    {/if}
                    {#if Contact}
                        <Contact {emailjsReady}/>
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

            {#if componentsLoaded}
                {#if Footer}
                    <Footer/>
                {/if}
                {#if BackToTop}
                    <BackToTop/>
                {/if}
            {/if}
        </div>
    {/if}
</div>
