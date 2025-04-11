/**
 * Image Loader Utilities
 *
 * This module provides utility functions for loading and preloading images
 * to improve perceived performance and user experience.
 */

/**
 * Loads a single image and returns a Promise that resolves when the image is loaded
 *
 * @param imageSrc - The URL or path of the image to load
 * @returns A Promise that resolves with the image source when loaded, or rejects on error
 */
export const lazyLoadImage = (imageSrc: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        const img = new Image();

        img.onload = () => {
            console.info(`Image loaded successfully: ${imageSrc}`);
            resolve(imageSrc);
        };
        img.onerror = () => {
            console.error(`Failed to load image: ${imageSrc}`);
            reject(new Error(`Failed to load image: ${imageSrc}`));
        };
        img.src = imageSrc;
    });
};

/**
 * Preloads multiple images concurrently
 *
 * @param imageSources - An array of image URLs or paths to preload
 * @returns A Promise that resolves when all images are loaded or rejects if any fail
 */
export const preloadImages = async (imageSources: string[]): Promise<void> => {
    try {
        await Promise.all(imageSources.map(lazyLoadImage));
    } catch (error) {
        console.error("Failed to preload images:", error);
    }
};
