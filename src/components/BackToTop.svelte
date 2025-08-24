<script>
    import { onMount } from 'svelte'

    let scrollY = $state(0)
    let isMounted = $state(false)
    let isHovered = $state(false)
    let isPressed = $state(false)
    let documentHeight = $state(0)
    let windowHeight = $state(0)
    let buttonElement = $state()

    const isVisible = $derived(isMounted && scrollY > 300)

    // Optimized scroll progress calculation
    const scrollProgress = $derived(() => {
        if (documentHeight === 0 || windowHeight === 0) return 0
        const totalScrollable = documentHeight - windowHeight
        return totalScrollable > 0 ? Math.min(scrollY / totalScrollable, 1) : 0
    })

    const buttonOpacity = $derived(() => {
        if (!isVisible) return 0
        const fadeStart = 300
        const fadeEnd = 500
        if (scrollY <= fadeStart) return 0
        if (scrollY >= fadeEnd) return 1
        return (scrollY - fadeStart) / (fadeEnd - fadeStart)
    })

    const accessibilityLabel = $derived(() => {
        const progress = Math.round(scrollProgress() * 100)
        return `Scroll back to top (${progress}% down the page)`
    })

    function updateDimensions() {
        documentHeight = document.documentElement.scrollHeight
        windowHeight = window.innerHeight
    }

    function scrollToTop() {
        window.scrollTo(0, 0)
        if (buttonElement) {
            buttonElement.blur()
        }
    }

    /**
     * @param {KeyboardEvent} event
     */
    function handleKeyDown(event) {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault()
            scrollToTop()
        }
    }

    function handleMouseEnter() {
        isHovered = true
    }

    function handleMouseLeave() {
        isHovered = false
        isPressed = false
    }

    function handleMouseDown() {
        isPressed = true
    }

    function handleMouseUp() {
        isPressed = false
    }

    onMount(() => {
        isMounted = true
        updateDimensions()

        let resizeTimeout
        const handleResize = () => {
            clearTimeout(resizeTimeout)
            resizeTimeout = setTimeout(updateDimensions, 150)
        }

        window.addEventListener('resize', handleResize, { passive: true })

        return () => {
            window.removeEventListener('resize', handleResize, false)
            clearTimeout(resizeTimeout)
        }
    })
</script>

<svelte:window bind:scrollY />

<!-- Floating back to top button -->
{#if isVisible}
    <button
        bind:this={buttonElement}
        onclick={scrollToTop}
        onkeydown={handleKeyDown}
        onmouseenter={handleMouseEnter}
        onmouseleave={handleMouseLeave}
        onmousedown={handleMouseDown}
        onmouseup={handleMouseUp}
        class="back-to-top-btn from-primary to-secondary fixed right-4 bottom-4 z-40 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-gradient-to-r text-xl font-bold text-gray-900 shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl focus:scale-110 focus:shadow-xl sm:right-6 sm:bottom-6 sm:h-14 sm:w-14 sm:text-2xl {isPressed
            ? 'pressed'
            : ''}"
        style="opacity: {buttonOpacity}"
        aria-label={accessibilityLabel()}
        title="Back to top"
        type="button"
    >
        <!-- Arrow icon -->
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="transition-transform duration-200 {isHovered ? 'hovered' : ''} {isPressed
                ? 'pressed'
                : ''}"
        >
            <polyline points="18,15 12,9 6,15" />
        </svg>
    </button>
{/if}

<style>
    /* Enhanced button styling */
    .back-to-top-btn {
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.1);

        background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%);

        box-shadow:
            0 4px 15px rgba(0, 0, 0, 0.2),
            0 0 0 1px rgba(255, 255, 255, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);

        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

        z-index: 40;
    }

    /* Enhanced hover and focus states */
    .back-to-top-btn:hover,
    .back-to-top-btn:focus {
        transform: scale(1.1) translateY(-2px);
        box-shadow:
            0 8px 25px rgba(0, 0, 0, 0.3),
            0 0 0 1px rgba(255, 255, 255, 0.2),
            0 0 20px rgba(245, 158, 11, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.3);
    }

    /* Enhanced focus outline for accessibility */
    .back-to-top-btn:focus {
        outline: 2px solid var(--color-primary);
        outline-offset: 3px;
    }

    /* Pulse animation for initial appearance */
    .back-to-top-btn {
        animation: fadeInScale 0.3s ease-out;
    }

    @keyframes fadeInScale {
        from {
            opacity: 0;
            transform: scale(0.8) translateY(10px);
        }
        to {
            opacity: 1;
            transform: scale(1) translateY(0);
        }
    }

    /* Responsive enhancements */
    @media (max-width: 640px) {
        .back-to-top-btn {
            right: 1rem;
            bottom: 1rem;
            height: 3rem;
            width: 3rem;
        }
    }

    /* High contrast mode support */
    @media (prefers-contrast: more) {
        .back-to-top-btn {
            border: 2px solid currentColor;
            background: var(--color-dark-100);
            color: var(--color-primary);
        }
    }

    /* Reduced motion preferences */
    @media (prefers-reduced-motion: reduce) {
        .back-to-top-btn {
            transition-duration: 0.01ms;
        }

        .back-to-top-btn:hover,
        .back-to-top-btn:focus {
            transform: none;
        }
    }

    /* Print styles*/
    @media print {
        .back-to-top-btn {
            display: none !important;
        }
    }
</style>
