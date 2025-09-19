/**
 * Performance timing and loader management utilities
 */

class PerformanceManager {
    constructor() {
        this.startTime = performance.now()
    }

    /**
     * Get the current load time in milliseconds
     * @returns {number} Load time since initialization
     */
    getLoadTime() {
        return performance.now() - this.startTime
    }

    /**
     * Hide the initial loading screen with a smooth transition
     */
    hideInitialLoader() {
        const loader = document.getElementById('initial-loading')
        if (loader) {
            loader.style.opacity = '0'
            setTimeout(() => {
                loader.remove()
            }, 500)
        }
    }

    /**
     * Set up global functions for compatibility with existing code
     */
    setupGlobalFunctions() {
        window.hideInitialLoader = () => this.hideInitialLoader()
        window.getLoadTime = () => this.getLoadTime()
    }
}

// Create a singleton instance
const performanceManager = new PerformanceManager()

// Auto-setup global functions
performanceManager.setupGlobalFunctions()

export default performanceManager
