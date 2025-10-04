<script lang="ts">
    import {scrollToSection} from '$lib/scrollUtils'
    import {onMount} from 'svelte'
    import '$styles/components/navigation.scss'

    interface NavItem {
        name: string
        href: string
    }

    const navItems: NavItem[] = [
        {name: 'Home', href: '#hero'},
        {name: 'Services', href: '#services'},
        {name: 'About', href: '#about'},
        {name: 'Skills', href: '#skills'},
        {name: 'Projects', href: '#projects'},
        {name: 'Contact', href: '#contact'},
    ]

    let isOpen: boolean = $state(false)
    let scrolled: boolean = $state(false)
    let ticking: boolean = $state(false)

    /**
     * Computed navigation bar CSS classes based on scroll state
     */
    const navigationClasses = $derived((): string => {
        const classes: string[] = ['navigation-bar']
        classes.push(scrolled ? 'scrolled' : 'default')
        return classes.join(' ')
    })

    /**
     * Toggles the mobile navigation menu open/closed state
     */
    function toggleMenu(): void {
        isOpen = !isOpen
    }

    /**
     * Closes the mobile navigation menu
     */
    function closeMenu(): void {
        isOpen = false
    }

    /**
     * Handles navigation link clicks with smooth scrolling
     * @param event - The click event
     * @param targetId - The target section ID to scroll to
     */
    function handleNavigation(event: Event, targetId: string): void {
        event.preventDefault()
        const success: boolean = scrollToSection(targetId)
        if (success && isOpen) {
            closeMenu()
        }
    }

    /**
     * Throttled scroll handler to update navigation bar appearance
     */
    function handleScroll(): void {
        if (!ticking) {
            requestAnimationFrame((): void => {
                scrolled = window.scrollY > 50
                ticking = false
            })
            ticking = true
        }
    }

    /**
     * Handles keyboard navigation for accessibility
     * @param e - The keyboard event
     */
    function handleKeydown(e: KeyboardEvent): void {
        if (e.key === 'Escape' && isOpen) {
            closeMenu()
        }
    }

    onMount((): (() => void) => {
        window.addEventListener('scroll', handleScroll, {passive: true})
        window.addEventListener('keydown', handleKeydown)

        return (): void => {
            window.removeEventListener('scroll', handleScroll)
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
                        onclick={(e: Event) => handleNavigation(e, '#hero')}
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
                                onclick={(e: Event) => handleNavigation(e, item.href)}
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
            onkeydown={(e: KeyboardEvent) => e.key === 'Enter' && closeMenu()}
            aria-label="Close navigation menu"
    ></div>

    <div class="mobile-menu-panel">
        <div class="mobile-menu-content">
            {#each navItems as item (item.href)}
                <button
                        type="button"
                        onclick={(e: Event) => handleNavigation(e, item.href)}
                        class="mobile-menu-link"
                >
                    {item.name}
                </button>
            {/each}
        </div>
    </div>
{/if}
