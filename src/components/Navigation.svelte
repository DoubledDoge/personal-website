<script>
    import {onMount} from 'svelte'
    import {scrollToSection} from '../lib/scrollUtils'

    // Import SCSS styles
    import '../styles/components/navigation.scss'

    const navItems = [
        {name: 'Home', href: '#hero'},
        {name: 'Services', href: '#services'},
        {name: 'About', href: '#about'},
        {name: 'Skills', href: '#skills'},
        {name: 'Projects', href: '#projects'},
        {name: 'Contact', href: '#contact'},
    ]

    let isOpen = $state(false)
    let scrolled = $state(false)
    let ticking = $state(false)

    const navigationClasses = $derived(() => {
        let classes = ['navigation-bar']
        classes.push(scrolled ? 'scrolled' : 'default')
        return classes.join(' ')
    })

    function toggleMenu() {
        isOpen = !isOpen
    }

    function closeMenu() {
        isOpen = false
    }

    function handleNavigation(event, targetId) {
        event.preventDefault()
        const success = scrollToSection(targetId)
        if (success && isOpen) {
            closeMenu()
        }
    }

    function handleScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                scrolled = window.scrollY > 50
                ticking = false
            })
            ticking = true
        }
    }

    function handleKeydown(e) {
        if (e.key === 'Escape' && isOpen) {
            closeMenu()
        }
    }

    onMount(() => {
        window.addEventListener('scroll', handleScroll, {passive: true})
        window.addEventListener('keydown', handleKeydown)

        return () => {
            window.removeEventListener('scroll', handleScroll, false)
            window.removeEventListener('keydown', handleKeydown)
        }
    })
</script>

<nav class={navigationClasses()}>
    <div class="navigation-container">
        <div class="navigation-content">
            <div class="navigation-brand-section">
                <button
                        class="navigation-brand-button"
                        onclick={e => handleNavigation(e, '#hero')}
                        type="button"
                >
                    Dihan Britz
                </button>
            </div>

            <div class="navigation-desktop-menu">
                <div class="navigation-desktop-links">
                    {#each navItems as item (item.href)}
                        <button
                                type="button"
                                onclick={e => handleNavigation(e, item.href)}
                                class="navigation-desktop-link"
                        >
                            {item.name}
                        </button>
                    {/each}
                </div>
            </div>

            <div class="navigation-mobile-section">
                <button
                        aria-expanded={isOpen}
                        aria-label="Toggle navigation menu"
                        class="navigation-mobile-toggle"
                        onclick={toggleMenu}
                        type="button"
                >
                    <span class="sr-only">Open main menu</span>

                    <svg
                            class={`navigation-mobile-icon ${!isOpen ? 'visible' : 'hidden'}`}
                            stroke="currentColor"
                            stroke-width="1.5"
                            viewBox="0 0 24 24"
                    >
                        <path
                                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                        />
                    </svg>

                    <svg
                            class={`navigation-mobile-icon ${isOpen ? 'visible' : 'hidden'}`}
                            stroke="currentColor"
                            stroke-width="1.5"
                            viewBox="0 0 24 24"
                    >
                        <path
                                d="M6 18L18 6M6 6l12 12"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                        />
                    </svg>
                </button>
            </div>
        </div>
    </div>
</nav>

{#if isOpen}
    <div
            class="mobile-menu-overlay"
            onclick={closeMenu}
            role="button"
            tabindex="0"
            onkeydown={e => e.key === 'Enter' && closeMenu()}
            aria-label="Close navigation menu"
    ></div>

    <div class="mobile-menu-panel">
        <div class="mobile-menu-content">
            {#each navItems as item (item.href)}
                <button
                        type="button"
                        onclick={e => handleNavigation(e, item.href)}
                        class="mobile-menu-link"
                >
                    {item.name}
                </button>
            {/each}
        </div>
    </div>
{/if}