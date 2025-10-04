/**
 * Loads a single image and returns a Promise that resolves when the image is loaded
 * @param imageSrc - The URL or path of the image to load
 * @returns Promise that resolves with the image source when loaded, or rejects on error
 */
export const lazyLoadImage = (imageSrc: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        if (!imageSrc) {
            reject(new Error('Invalid image source provided'))
            return
        }

        const img: HTMLImageElement = new Image()

        img.onload = (): void => {
            resolve(imageSrc)
        }

        img.onerror = (): void => {
            const errorMessage = `Failed to load image: ${imageSrc}`
            reject(new Error(errorMessage))
        }

        img.loading = 'eager'
        img.decoding = 'async'
        img.src = imageSrc
    })
}

/**
 * Preloads multiple images concurrently with enhanced error handling
 * @param imageSources - An array of image URLs or paths to preload
 * @returns Promise that resolves when all images are processed
 */
export const preloadImages = async (imageSources: string[]): Promise<void> => {
    if (!Array.isArray(imageSources)) {
        return
    }

    if (imageSources.length === 0) {
        return
    }

    const loadPromises: Promise<string | null>[] = imageSources.map((src: string) =>
        lazyLoadImage(src).catch((): null => {
            return null
        })
    )

    const results: (string | null)[] = await Promise.all(loadPromises)
    results.filter((result): result is string => result !== null)
}
