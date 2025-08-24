<script>
    import { onMount } from 'svelte'

    const navItems = [
        { name: 'Home', href: '#hero' },
        { name: 'Services', href: '#services' },
        { name: 'About', href: '#about' },
        { name: 'Skills', href: '#skills' },
        { name: 'Projects', href: '#projects' },
        { name: 'Contact', href: '#contact' },
    ]

    let isOpen = $state(false)
    let scrolled = $state(false)
    let ticking = $state(false)

    function toggleMenu() {
        isOpen = !isOpen
        console.log('Menu toggled:', isOpen)
    }

    function closeMenu() {
        isOpen = false
        console.log('Menu closed')
    }

    /**
     * Handle navigation to sections with instant scrolling
     * @param {Event} event
     * @param {string} targetId
     */
    function handleNavigation(event, targetId) {
        event.preventDefault()

        const targetElement = document.querySelector(targetId)
        if (!targetElement) {
            console.warn(`Target element ${targetId} not found`)
            return
        }

        // Calculate offset for fixed navigation
        const navHeight = 64 // 16 * 4 (h-16 in Tailwind)
        const targetPosition =
            targetElement.getBoundingClientRect().top + window.scrollY - navHeight

        // Simple scroll to position
        window.scrollTo(0, targetPosition)

        // Close the mobile menu if open
        if (isOpen) {
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

    /**
     * @param {KeyboardEvent} e
     */
    function handleKeydown(e) {
        if (e.key === 'Escape' && isOpen) {
            closeMenu()
        }
    }

    onMount(() => {
        // Add scroll and keyboard event listeners
        window.addEventListener('scroll', handleScroll, { passive: true })
        window.addEventListener('keydown', handleKeydown)

        // Cleanup function
        return () => {
            window.removeEventListener('scroll', handleScroll, false)
            window.removeEventListener('keydown', handleKeydown)
        }
    })
</script>

<!-- Navigation  -->
<nav class="fixed top-0 right-0 left-0 z-50" class:nav-scrolled={scrolled}>
    <div class="mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div class="flex h-16 items-center justify-between">
            <!-- Logo/Brand -->
            <div class="flex-shrink-0">
                <button
                    class="rounded-md text-xl font-bold text-white transition-colors hover:text-amber-400 focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-none"
                    onclick={e => handleNavigation(e, '#hero')}
                    type="button"
                >
                    Dihan Britz
                </button>
            </div>

            <!-- Desktop Navigation -->
            <div class="hidden md:block">
                <div class="ml-10 flex items-baseline space-x-8">
                    {#each navItems as item (item.href)}
                        <button
                            type="button"
                            onclick={e => handleNavigation(e, item.href)}
                            class="rounded-md px-3 py-2 text-base font-medium text-gray-300 transition-all duration-200 hover:bg-gray-700 hover:text-white focus:bg-gray-700 focus:text-white focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-none"
                        >
                            {item.name}
                        </button>
                    {/each}
                </div>
            </div>

            <!-- Mobile menu buttons -->
            <div class="md:hidden">
                <button
                    type="button"
                    onclick={toggleMenu}
                    class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 transition-colors hover:bg-gray-700 hover:text-white focus:bg-gray-700 focus:text-white focus:outline-none"
                    aria-expanded={isOpen}
                    aria-label="Toggle navigation menu"
                >
                    <span class="sr-only">Open main menu</span>
                    <!-- Hamburger icon -->
                    <svg
                        class="h-6 w-6 transition-opacity duration-150 {isOpen
                            ? 'absolute opacity-0'
                            : 'opacity-100'}"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                        />
                    </svg>
                    <!-- Close icon -->
                    <svg
                        class="h-6 w-6 transition-opacity duration-150 {isOpen
                            ? 'opacity-100'
                            : 'absolute opacity-0'}"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
            </div>
        </div>
    </div>
</nav>

<!-- Mobile Navigation Menu -->
{#if isOpen}
    <!-- Background overlay -->
    <div
        class="fixed inset-0 z-40 bg-gray-900/80 backdrop-blur-sm md:hidden"
        onclick={closeMenu}
        role="button"
        tabindex="0"
        onkeydown={e => e.key === 'Enter' && closeMenu()}
        aria-label="Close navigation menu"
    ></div>

    <!-- Menu content -->
    <div class="mobile-menu fixed top-16 right-0 left-0 z-50 md:hidden">
        <div class="border-t border-gray-700 bg-gray-800/95 shadow-xl backdrop-blur-md">
            <div class="space-y-1 px-4 pt-4 pb-6">
                {#each navItems as item (item.href)}
                    <button
                        type="button"
                        onclick={e => handleNavigation(e, item.href)}
                        class="block w-full rounded-md px-3 py-3 text-left text-lg font-medium text-gray-300 transition-all duration-200 hover:bg-gray-700 hover:text-white focus:bg-gray-700 focus:text-white focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-none"
                    >
                        {item.name}
                    </button>
                {/each}
            </div>
        </div>
    </div>
{/if}

<style>
    nav {
        background: rgba(17, 24, 39, 0.3);
        backdrop-filter: blur(8px);
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }

    nav.nav-scrolled {
        background: rgba(17, 24, 39, 0.95);
        backdrop-filter: blur(20px);
        border-bottom: 1px solid rgba(107, 114, 128, 0.3);
    }

    .mobile-menu {
        animation: slideDown 0.2s ease-out;
    }

    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    svg {
        transition: opacity 0.15s ease-in-out;
    }

    .fixed {
        z-index: 9999;
    }

    @media (max-width: 768px) {
        nav {
            position: fixed !important;
            top: 0;
            left: 0;
            right: 0;
            z-index: 50;
        }
    }
</style>
