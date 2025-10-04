<script lang="ts">
    import {onMount} from 'svelte'
    import {hasScrolledPastThreshold, scrollToTop} from '$lib/scrollUtils'
    import '$styles/components/back-to-top.scss'

    let scrollY: number = $state(0)
    let isMounted: boolean = $state(false)
    let isPressed: boolean = $state(false)
    let documentHeight: number = $state(0)
    let windowHeight: number = $state(0)
    let buttonElement: HTMLButtonElement | undefined = $state()

    const VISIBILITY_THRESHOLD = 300
    const FADE_START = 300
    const FADE_END = 500

    /**
     * Determines if the back-to-top button should be visible
     */
    const isVisible: boolean = $derived(
            isMounted && hasScrolledPastThreshold(VISIBILITY_THRESHOLD, scrollY)
    )

    /**
     * Calculates scroll progress as a percentage (0-1)
     */
    const scrollProgress = $derived(
            (() => {
                if (documentHeight === 0 || windowHeight === 0) return 0
                const totalScrollable: number = documentHeight - windowHeight
                return totalScrollable > 0 ? Math.min(scrollY / totalScrollable, 1) : 0
            })()
    )

    /**
     * Calculates button opacity based on scroll position with fade effect
     */
    const buttonOpacity = $derived((): number => {
        if (!isVisible) return 0
        if (scrollY <= FADE_START) return 0
        if (scrollY >= FADE_END) return 1
        return (scrollY - FADE_START) / (FADE_END - FADE_START)
    })

    /**
     * Generates accessibility label with scroll progress
     */
    const accessibilityLabel = $derived(
            (() => {
                const progress: number = Math.round(100 * scrollProgress)
                return `Scroll back to top (${progress}% down the page)`
            })()
    )

    /**
     * Generates CSS classes for the button based on state
     */
    const buttonClasses = $derived((): string => {
        const classes: string[] = ['back-to-top-button']
        if (isPressed) classes.push('pressed')
        return classes.join(' ')
    })

    /**
     * Updates document and window dimensions for scroll calculations
     */
    function updateDimensions(): void {
        documentHeight = document.documentElement.scrollHeight
        windowHeight = window.innerHeight
    }

    /**
     * Handles scroll to the top action and remove focus from the button
     */
    function handleScrollToTop(): void {
        scrollToTop()
        buttonElement?.blur()
    }

    /**
     * Handles keyboard navigation for the button
     * @param event - The keyboard event
     */
    function handleKeyDown(event: KeyboardEvent): void {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault()
            handleScrollToTop()
        }
    }

    /**
     * Handles mouse press state for visual feedback
     */
    function handleMouseDown(): void {
        isPressed = true
    }

    /**
     * Handles mouse release state
     */
    function handleMouseUp(): void {
        isPressed = false
    }

    onMount((): (() => void) => {
        isMounted = true
        updateDimensions()

        let resizeTimeout: ReturnType<typeof setTimeout>

        const handleResize = (): void => {
            clearTimeout(resizeTimeout)
            resizeTimeout = setTimeout(updateDimensions, 150)
        }

        window.addEventListener('resize', handleResize, { passive: true })

        return (): void => {
            window.removeEventListener('resize', handleResize)
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
            onmousedown={handleMouseDown}
            onmouseup={handleMouseUp}
            class={buttonClasses}
            style="opacity: {buttonOpacity}"
            aria-label={accessibilityLabel}
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
                class="back-to-top-arrow {isPressed ? 'pressed' : ''}"
        >
            <polyline points="18,15 12,9 6,15" />
        </svg>
    </button>
{/if}
