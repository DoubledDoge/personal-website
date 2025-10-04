<script lang="ts">
    import topPicture from '$assets/top_picture.webp'
    import textContent from '$data/text-content.json'
    import {downloadResume} from '$lib/downloadUtils'
    import {scrollToContact} from '$lib/scrollUtils'
    import '$styles/components/hero.scss'

    let profileImage: string = $state(topPicture)
    let isImageLoading: boolean = $state(false)
    let imageLoadError: boolean = $state(false)
    let isDownloading: boolean = $state(false)
    let downloadError: string = $state('')

    /**
     * Handles resume download with proper state management and error handling
     * @param event - The click event from the download button
     */
    async function handleDownload(event: Event): Promise<void> {
        event.preventDefault()
        if (isDownloading) return

        await downloadResume({
            onStart: (): void => {
                isDownloading = true
                downloadError = ''
            },
            onSuccess: (): void => {
                isDownloading = false
            },
            onError: (errorMessage: string): void => {
                downloadError = errorMessage
                isDownloading = false
            },
        })
    }

    /**
     * Clears the download error message from the UI
     */
    function clearDownloadError(): void {
        downloadError = ''
    }
</script>

<!-- Rest of your template stays exactly the same -->
<section class="hero-section" id="hero">
    <div class="hero-container">
        <div class="hero-content-grid">
            <div class="hero-text-content">
                <header class="hero-header">
                    <h1 class="hero-title">
                        Hi, I'm
                        <span class="hero-name-highlight"> {textContent.hero.name} </span>
                        <span aria-label="waving hand" role="img">😊</span>
                    </h1>
                </header>

                <p class="hero-tagline">
                    {textContent.hero.tagline}
                </p>

                <div class="hero-cta-container">
                    <button
                            aria-label="Scroll to contact section to hire me"
                            class="hero-primary-button"
                            onclick={scrollToContact}
                            type="button"
                    >
                        Hire Me
                    </button>

                    <button
                            aria-label="Download my resume as PDF"
                            class="hero-secondary-button {isDownloading
                            ? 'hero-secondary-button:disabled'
                            : ''}"
                            disabled={isDownloading}
                            onclick={handleDownload}
                            onfocus={clearDownloadError}
                            type="button"
                    >
                        <span aria-hidden="true" class="hero-button-icon-container">
                            {#if isDownloading}
                                <span class="hero-loading-spinner"></span>
                            {:else}
                                <svg
                                        class="hero-download-icon"
                                        width="18"
                                        height="22"
                                        viewBox="0 0 18 22"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
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

                {#if downloadError}
                    <div class="hero-error-message" role="alert" aria-live="polite">
                        <p class="hero-error-text">
                            <span class="sr-only">Error:</span>
                            {downloadError}
                        </p>
                        <button
                                type="button"
                                onclick={clearDownloadError}
                                class="hero-dismiss-button"
                                aria-label="Dismiss error message"
                        >
                            Dismiss
                        </button>
                    </div>
                {/if}
            </div>

            <div class="hero-image-section">
                <span aria-hidden="true" class="hero-image-background"></span>

                <div class="hero-image-container">
                    <div class="hero-image-border">
                        <div class="hero-image-wrapper">
                            {#if isImageLoading}
                                <div class="hero-loading-skeleton">
                                    <span class="hero-loading-icon"></span>
                                </div>
                            {:else}
                                <img
                                        src={profileImage}
                                        alt="Dihan Britz - Software Engineering Student"
                                        width="384"
                                        height="384"
                                        class="hero-profile-image {imageLoadError ? 'error' : ''}"
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
