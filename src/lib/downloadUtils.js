/**
 * Download utilities for file management with proper error handling
 */

/**
 * Download a file from a URL with comprehensive error handling
 * @param {string} url - The URL to download from
 * @param {string} filename - The filename for the downloaded file
 * @param {Object} options - Configuration options
 * @param {Function} options.onStart - Callback when download starts
 * @param {Function} options.onSuccess - Callback when download succeeds
 * @param {Function} options.onError - Callback when download fails
 * @param {string} options.ariaLabel - Accessibility label for download link
 * @returns {Promise<boolean>} - Success status
 */
export async function downloadFile(url, filename, options = {}) {
    const {
        onStart = () => {},
        onSuccess = () => {},
        onError = () => {},
        ariaLabel = `Download ${filename}`,
    } = options

    try {
        onStart()

        const response = await fetch(url)

        if (!response.ok) {
            const errorMessage = getErrorMessage(response.status)
            onError(errorMessage)
            console.error('Download failed:', errorMessage)
            return false
        }

        const blob = await response.blob()
        const downloadUrl = window.URL.createObjectURL(blob)

        // Create and trigger download
        const downloadLink = document.createElement('a')
        downloadLink.href = downloadUrl
        downloadLink.download = filename
        downloadLink.setAttribute('aria-label', ariaLabel)

        document.body.appendChild(downloadLink)
        downloadLink.click()

        // Cleanup
        window.URL.revokeObjectURL(downloadUrl)
        document.body.removeChild(downloadLink)

        onSuccess()
        console.info(`Download completed successfully: ${filename}`)
        return true
    } catch (error) {
        const errorMessage = 'Download failed. Please try again.'
        onError(errorMessage)
        console.error('Error downloading file:', error)
        return false
    }
}

/**
 * Get user-friendly error message based on HTTP status code
 * @param {number} status - HTTP status code
 * @returns {string} - User-friendly error message
 */
function getErrorMessage(status) {
    switch (status) {
        case 404:
            return 'File not found'
        case 403:
            return 'Access denied'
        case 500:
            return 'Server error occurred'
        case 503:
            return 'Service temporarily unavailable'
        default:
            return `Download failed (${status})`
    }
}

/**
 * Download resume with predefined configuration
 * @param {Object} callbacks - Callback functions for state management
 * @param {Function} callbacks.onStart - Called when download starts
 * @param {Function} callbacks.onSuccess - Called when download succeeds
 * @param {Function} callbacks.onError - Called when download fails
 * @returns {Promise<boolean>} - Success status
 */
export async function downloadResume(callbacks = {}) {
    const resumeUrl = `${import.meta.env?.BASE_URL || ''}resume.pdf`
    const filename = 'Dihan_Britz_Resume.pdf'

    return await downloadFile(resumeUrl, filename, {
        ...callbacks,
        ariaLabel: 'Download Dihan Britz Resume PDF',
    })
}
