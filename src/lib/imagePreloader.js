/**
 * Loads a single image and returns a Promise that resolves when the image is loaded
 *
 * @param {string} imageSrc - The URL or path of the image to load
 * @returns {Promise<string>} A Promise that resolves with the image source when loaded, or rejects on error
 */
export const lazyLoadImage = imageSrc => {
    return new Promise((resolve, reject) => {
        // Input validation
        if (!imageSrc || typeof imageSrc !== 'string') {
            reject(new Error('Invalid image source provided'))
            return
        }

        const img = new Image()

        img.onload = () => {
            console.info(`Image loaded successfully: ${imageSrc}`)
            resolve(imageSrc)
        }

        img.onerror = event => {
            const errorMessage = `Failed to load image: ${imageSrc}`
            console.error(errorMessage, event)
            reject(new Error(errorMessage))
        }

        // Set loading attributes for better performance
        img.loading = 'eager'
        img.decoding = 'async'

        // Trigger the load
        img.src = imageSrc
    })
}

/**
 * Preloads multiple images concurrently with enhanced error handling
 *
 * @param {string[]} imageSources - An array of image URLs or paths to preload
 * @returns {Promise<void>} A Promise that resolves when all images are loaded
 */
export const preloadImages = async imageSources => {
    // Input validation
    if (!Array.isArray(imageSources)) {
        console.error('preloadImages expects an array of image sources')
        return
    }

    if (imageSources.length === 0) {
        console.info('No images to preload')
        return
    }

    try {
        const loadPromises = imageSources.map(src =>
            lazyLoadImage(src).catch(error => {
                // Log individual failures but don't break the entire batch
                console.warn(`Skipping failed image: ${src}`, error)
                return null
            })
        )

        const results = await Promise.all(loadPromises)
        const successfulLoads = results.filter(result => result !== null)

        console.info(
            `Successfully preloaded ${successfulLoads.length}/${imageSources.length} images`
        )
    } catch (error) {
        console.error('Unexpected error during image preloading:', error)
    }
}
