interface WindowWithPerformance extends Window {
    hideInitialLoader: () => void
    getLoadTime: () => number
}

class PerformanceManager {
    private readonly startTime: number

    constructor() {
        this.startTime = performance.now()
    }

    /**
     * Get the current load time in milliseconds
     * @returns Load time since initialization
     */
    getLoadTime(): number {
        return performance.now() - this.startTime
    }

    /**
     * Hide the initial loading screen with a smooth transition
     */
    hideInitialLoader(): void {
        const loader: HTMLElement | null = document.getElementById('initial-loading')
        if (loader) {
            loader.style.opacity = '0'
            setTimeout((): void => {
                loader.remove()
            }, 500)
        }
    }

    /**
     * Set up global functions for compatibility with existing code
     */
    setupGlobalFunctions(): void {
        const windowWithPerf = window as unknown as WindowWithPerformance
        windowWithPerf.hideInitialLoader = (): void => this.hideInitialLoader()
        windowWithPerf.getLoadTime = (): number => this.getLoadTime()
    }
}

const performanceManager = new PerformanceManager()

performanceManager.setupGlobalFunctions()

export default performanceManager
