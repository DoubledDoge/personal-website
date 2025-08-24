<script>
    import topPicture from '../assets/top_picture.webp'

    let profileImage = $state(topPicture)
    let isImageLoading = $state(false)
    let imageLoadError = $state(false)
    let isDownloading = $state(false)
    let downloadError = $state('')

    /**
     * Smooth scroll to the contact section (Will be worked on soon)
     */
    function scrollToContact() {
        const contactSection = document.querySelector('#contact')
        if (contactSection) {
            contactSection.scrollIntoView({
                behavior: 'smooth',
            })
        } else {
            console.warn('Contact section not found')
        }
    }

    /**
     * Get resume URL with proper base path handling
     * @returns {string}
     */
    function getResumeUrl() {
        return `${import.meta.env?.BASE_URL}resume.pdf`
    }

    /**
     * Handle resume download with enhanced error handling and user feedback
     * @param {MouseEvent} event
     */
    async function handleDownload(event) {
        event.preventDefault()

        if (isDownloading) return // Prevent multiple simultaneous downloads

        isDownloading = true
        downloadError = '' // Clear any previous errors

        try {
            const response = await fetch(getResumeUrl())

            if (!response.ok) {
                // Handle different HTTP error codes appropriately
                const errorMessage =
                    response.status === 404
                        ? 'Resume file not found'
                        : `Download failed (${response.status})`
                downloadError = errorMessage
                console.error('Download failed:', errorMessage)
                return
            }

            const blob = await response.blob()
            const url = window.URL.createObjectURL(blob)

            // Create and trigger download
            const downloadLink = document.createElement('a')
            downloadLink.href = url
            downloadLink.download = 'Dihan_Britz_Resume.pdf'
            downloadLink.setAttribute('aria-label', 'Download Dihan Britz Resume PDF')

            document.body.appendChild(downloadLink)
            downloadLink.click()

            // Cleanup
            window.URL.revokeObjectURL(url)
            document.body.removeChild(downloadLink)

            console.info('Resume download completed successfully')
        } catch (error) {
            downloadError = 'Download failed. Please try again.'
            console.error('Error downloading resume:', error)
        } finally {
            isDownloading = false
        }
    }

    function clearDownloadError() {
        downloadError = ''
    }
</script>

<section id="hero" class="relative w-full">
    <!-- Background gradient effects -->
    <div class="absolute inset-x-0 top-0 flex h-64 items-start">
        <span class="h-24 w-2/3 bg-gradient-to-br from-[#570cac] opacity-40 blur-2xl"></span>
        <span class="h-20 w-3/5 bg-gradient-to-r from-[#670ccf] opacity-40 blur-2xl"></span>
    </div>
    <div class="container-responsive relative">
        <div
            class="relative mx-auto grid max-w-4xl gap-10 pt-24 md:max-w-5xl lg:max-w-6xl lg:grid-cols-2 xl:gap-16"
        >
            <!-- Text Content -->
            <div class="flex flex-col justify-center lg:py-12">
                <header class="text-center lg:text-left">
                    <h1 class="pt-4 text-4xl font-bold text-white md:text-5xl lg:text-6xl">
                        Hi, I'm
                        <span class="text-gradient"> Dihan </span>
                        <span role="img" aria-label="waving hand">😊</span>
                    </h1>
                </header>
                <!-- Tagline / Subtitle (could be added to json) -->
                <p class="mx-auto max-w-2xl pt-8 text-center text-gray-300 lg:mx-0 lg:text-left">
                    I'm an aspiring Software Engineer and Information Technology student at Eduvos,
                    focusing on C# development and database design. With a strong foundation in
                    desktop applications and a growing interest in web technologies, I'm passionate
                    about creating efficient, maintainable solutions while continuously expanding my
                    technical expertise.
                </p>
                <!-- Call-to-action buttons -->
                <div
                    class="flex flex-col items-center gap-3 pt-9 sm:mx-auto sm:w-max sm:flex-row lg:mx-0"
                >
                    <!-- Primary CTA Button -->
                    <button
                        type="button"
                        onclick={scrollToContact}
                        class="btn-primary w-full cursor-pointer sm:w-max"
                        aria-label="Scroll to contact section to hire me"
                    >
                        Hire Me
                    </button>

                    <!-- Resume Download Button -->
                    <button
                        type="button"
                        onclick={handleDownload}
                        disabled={isDownloading}
                        class="btn-secondary flex w-full items-center justify-center gap-2 sm:w-max {isDownloading
                            ? 'cursor-not-allowed opacity-75'
                            : 'cursor-pointer'}"
                        aria-label="Download my resume as PDF"
                        onfocus={clearDownloadError}
                    >
                        <!-- Download Icon with Loading State -->
                        <span class="svg-container" aria-hidden="true">
                            {#if isDownloading}
                                <!-- Loading spinner -->
                                <span
                                    class="inline-block h-[18px] w-[18px] animate-spin rounded-full border-2 border-amber-500 border-t-transparent"
                                    role="status"
                                    aria-label="Downloading resume"
                                ></span>
                            {:else}
                                <!-- Download SVG Icon -->
                                <svg
                                    class="download-icon"
                                    width="18"
                                    height="22"
                                    viewBox="0 0 18 22"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    aria-hidden="true"
                                >
                                    <path
                                        class="download-arrow"
                                        d="M9 1v12M13 9L9 13L5 9"
                                        stroke="currentColor"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                    <path
                                        d="M1 17V18C1 18.7956 1.31607 19.5587 1.87868 20.1213C2.44129 20.6839 3.20435 21 4 21H14C14.7956 21 15.5587 20.6839 16.1213 20.1213C16.6839 19.5587 17 18.7956 17 18V17"
                                        stroke="currentColor"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                </svg>
                            {/if}
                        </span>
                        <span>
                            {isDownloading ? 'Downloading...' : 'Download resume'}
                        </span>
                    </button>
                </div>

                <!-- Error Message Display -->
                {#if downloadError}
                    <div
                        class="mt-4 rounded-md border border-red-500/30 bg-red-900/20 p-3 text-center sm:mx-auto sm:w-max lg:mx-0"
                        role="alert"
                        aria-live="polite"
                    >
                        <p class="text-sm text-red-400">
                            <span class="sr-only">Error:</span>
                            {downloadError}
                        </p>
                        <button
                            type="button"
                            onclick={clearDownloadError}
                            class="mt-2 text-xs text-red-300 underline hover:text-red-200"
                            aria-label="Dismiss error message"
                        >
                            Dismiss
                        </button>
                    </div>
                {/if}
            </div>

            <!-- Profile Image Section -->
            <div class="relative flex items-center justify-center lg:justify-center">
                <!-- Background gradient for image -->
                <span
                    class="absolute -inset-4 rounded-full bg-gradient-to-tr from-[#570cac] to-amber-500 opacity-20 blur-3xl"
                    aria-hidden="true"
                ></span>

                <!-- Profile Image Container -->
                <div class="relative z-10">
                    <!-- Outer border ring -->
                    <div
                        class="rounded-full border-2 border-amber-500 p-1 shadow-2xl shadow-amber-500/20"
                    >
                        <!-- Inner container for consistent sizing -->
                        <div
                            class="relative h-72 w-72 overflow-hidden rounded-full bg-gray-800 sm:h-80 sm:w-80 md:h-96 md:w-96"
                        >
                            {#if isImageLoading}
                                <!-- Loading skeleton -->
                                <div
                                    class="flex h-full w-full animate-pulse items-center justify-center bg-gray-700"
                                    role="img"
                                    aria-label="Loading profile image"
                                >
                                    <span
                                        class="h-8 w-8 animate-spin rounded-full border-2 border-amber-500 border-t-transparent"
                                        role="status"
                                        aria-label="Loading"
                                    ></span>
                                </div>
                            {:else}
                                <!-- Profile Image -->
                                <img
                                    src={profileImage}
                                    alt="Dihan Britz - Software Engineering Student"
                                    width="384"
                                    height="384"
                                    class="h-full w-full object-cover transition-transform duration-300 hover:scale-105 {imageLoadError
                                        ? 'grayscale'
                                        : ''}"
                                    loading="eager"
                                    fetchpriority="high"
                                    decoding="sync"
                                />
                            {/if}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<style>
    /* Component-specific styles for enhanced interactions */
    .download-icon {
        transition: transform var(--duration-normal) ease;
    }

    .btn-secondary:hover .download-icon {
        transform: translateY(2px);
    }

    /* Enhanced loading animation */
    .svg-container {
        display: flex;
        align-items: center;
        justify-content: center;
        min-width: 18px;
        min-height: 22px;
    }

    /* Ensure smooth image transitions */
    img {
        transition:
            transform var(--duration-normal) ease,
            filter var(--duration-normal) ease;
    }

    img:hover {
        transform: scale(1.02);
    }

    /* Enhanced gradient backgrounds */
    .bg-gradient-to-br {
        background: linear-gradient(to bottom right, var(--tw-gradient-stops));
    }

    .bg-gradient-to-r {
        background: linear-gradient(to right, var(--tw-gradient-stops));
    }

    .bg-gradient-to-tr {
        background: linear-gradient(to top right, var(--tw-gradient-stops));
    }

    /* Error message animation */
    [role='alert'] {
        animation: slideIn 0.3s ease-out;
    }

    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
</style>
