export const lazyLoadImage = (imageSrc: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        const img = new Image();

        img.onload = () => resolve(imageSrc);
        img.onerror = () => {
            console.error(`Failed to load image: ${imageSrc}`);
            reject(new Error(`Failed to load image: ${imageSrc}`));
        };
        img.src = imageSrc;
    });
};

export const preloadImages = async (imageSources: string[]): Promise<void> => {
    try {
        await Promise.all(imageSources.map(lazyLoadImage));
    } catch (error) {
        console.error('Failed to preload images:', error);
    }
};