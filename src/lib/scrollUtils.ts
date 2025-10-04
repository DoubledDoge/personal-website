const DEFAULT_NAV_HEIGHT = 64

/**
 * Scroll to a specific section with proper offset handling
 * @param selector - CSS selector for the target element
 * @param offset - Additional offset from top (default: DEFAULT_NAV_HEIGHT)
 * @returns Success status
 */
export function scrollToSection(selector: string, offset: number = DEFAULT_NAV_HEIGHT): boolean {
    const targetElement: Element | null = document.querySelector(selector)

    if (!targetElement) {
        return false
    }

    const targetPosition: number =
        targetElement.getBoundingClientRect().top + window.scrollY - offset

    window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
    })

    return true
}

/**
 * Scroll to the contact section specifically
 * @returns Success status
 */
export function scrollToContact(): boolean {
    return scrollToSection('#contact')
}

/**
 * Scroll to top of page
 */
export function scrollToTop(): void {
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    })
}

/**
 * Check if user has scrolled past a certain threshold
 * @param threshold - Scroll threshold in pixels (default: 100)
 * @param currentScrollY - Current scroll position (default: window.scrollY)
 * @returns Whether user has scrolled past the threshold
 */
export function hasScrolledPastThreshold(
    threshold = 100,
    currentScrollY: number = window.scrollY
): boolean {
    return currentScrollY > threshold
}
