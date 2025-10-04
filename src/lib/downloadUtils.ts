interface DownloadOptions {
    onStart?: () => void
    onSuccess?: () => void
    onError?: (message: string) => void
    ariaLabel?: string
}

interface DownloadCallbacks {
    onStart?: () => void
    onSuccess?: () => void
    onError?: (message: string) => void
}

function noop(): void {
    // Intentionally empty
}

function noopError(): void {
    // Intentionally empty
}

/**
 * Download a file from a URL with comprehensive error handling
 * @param url - The URL to download from
 * @param filename - The filename for the downloaded file
 * @param options - Configuration options
 * @returns Promise that resolves to success status
 */
export async function downloadFile(
    url: string,
    filename: string,
    options: DownloadOptions = {}
): Promise<boolean> {
    const {
        onStart = noop,
        onSuccess = noop,
        onError = noopError,
        ariaLabel = `Download ${filename}`,
    } = options

    try {
        onStart()

        const response: Response = await fetch(url)

        if (!response.ok) {
            const errorMessage: string = getErrorMessage(response.status)
            onError(errorMessage)
            return false
        }

        const blob: Blob = await response.blob()
        const downloadUrl: string = window.URL.createObjectURL(blob)

        const downloadLink: HTMLAnchorElement = document.createElement('a')
        downloadLink.href = downloadUrl
        downloadLink.download = filename
        downloadLink.setAttribute('aria-label', ariaLabel)

        document.body.appendChild(downloadLink)
        downloadLink.click()

        window.URL.revokeObjectURL(downloadUrl)
        document.body.removeChild(downloadLink)

        onSuccess()
        return true
    } catch {
        const errorMessage = 'Download failed. Please try again.'
        onError(errorMessage)
        return false
    }
}

/**
 * Get user-friendly error message based on HTTP status code
 * @param status - HTTP status code
 * @returns User-friendly error message
 */
function getErrorMessage(status: number): string {
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
 * @param callbacks - Callback functions for state management
 * @returns Promise that resolves to success status
 */
export async function downloadResume(callbacks: DownloadCallbacks = {}): Promise<boolean> {
    const resumeUrl = `${import.meta.env.BASE_URL || ''}resume.pdf`
    const filename = 'Dihan_Britz_Resume.pdf'

    return await downloadFile(resumeUrl, filename, {
        ...callbacks,
        ariaLabel: 'Download Dihan Britz Resume PDF',
    })
}
