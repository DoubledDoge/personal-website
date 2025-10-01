<script>
    import {onMount} from 'svelte'
    import {hasScrolledPastThreshold, scrollToTop} from '../lib/scrollUtils.js'

    // Import SCSS styles
    import '../styles/components/back-to-top.scss'

    let scrollY = $state(0)
    let isMounted = $state(false)
    let isHovered = $state(false)
    let isPressed = $state(false)
    let documentHeight = $state(0)
    let windowHeight = $state(0)
    let buttonElement = $state()

    const VISIBILITY_THRESHOLD = 300

    const isVisible = $derived(isMounted && hasScrolledPastThreshold(VISIBILITY_THRESHOLD, scrollY))

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

    const buttonClasses = $derived(() => {
        let classes = ['back-to-top-button']

        if (isPressed) {
            classes.push('pressed')
        }

        return classes.join(' ')
    })

    const arrowClasses = $derived(() => {
        let classes = ['back-to-top-arrow']

        if (isHovered) {
            classes.push('hovered')
        }

        if (isPressed) {
            classes.push('pressed')
        }

        return classes.join(' ')
    })

    function updateDimensions() {
        documentHeight = document.documentElement.scrollHeight
        windowHeight = window.innerHeight
    }

    function handleScrollToTop() {
        scrollToTop()
        if (buttonElement) {
            buttonElement.blur()
        }
    }

    function handleKeyDown(event) {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault()
            handleScrollToTop()
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

{#if isVisible}
    <button
            bind:this={buttonElement}
            onclick={handleScrollToTop}
            onkeydown={handleKeyDown}
            onmouseenter={handleMouseEnter}
            onmouseleave={handleMouseLeave}
            onmousedown={handleMouseDown}
            onmouseup={handleMouseUp}
            class={buttonClasses()}
            style="opacity: {buttonOpacity()}"
            aria-label={accessibilityLabel()}
            title="Back to top"
            type="button"
    >
        <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
                class={arrowClasses()}
        >
            <polyline points="18,15 12,9 6,15" />
        </svg>
    </button>
{/if}