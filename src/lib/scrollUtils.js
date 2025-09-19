/**
 * Scroll utilities for smooth navigation between sections
 */

/**
 * Default navigation height for offset calculations
 * @type {number}
 */
const DEFAULT_NAV_HEIGHT = 64

/**
 * Scroll to a specific section with proper offset handling
 * @param {string} selector - CSS selector for the target element
 * @param {number} [offset=DEFAULT_NAV_HEIGHT] - Additional offset from top
 * @returns {boolean} - Success status
 */
export function scrollToSection(selector, offset = DEFAULT_NAV_HEIGHT) {
    const targetElement = document.querySelector(selector)

    if (!targetElement) {
        console.warn(`Target element not found: ${selector}`)
        return false
    }

    const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - offset

    window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
    })

    console.log(`Scrolling to section: ${selector}`)
    return true
}

/**
 * Scroll to the contact section specifically
 * @returns {boolean} - Success status
 */
export function scrollToContact() {
    return scrollToSection('#contact')
}

/**
 * Scroll to top of page
 * @returns {void}
 */
export function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    })

    console.log('Scrolling to top of page')
}

/**
 * Check if user has scrolled past a certain threshold
 * @param {number} [threshold=100] - Scroll threshold in pixels
 * @param {number} [currentScrollY=window.scrollY] - Current scroll position (allows passing reactive values)
 * @returns {boolean} - Whether user has scrolled past the threshold
 */
export function hasScrolledPastThreshold(threshold = 100, currentScrollY = window.scrollY) {
    return currentScrollY > threshold
}
