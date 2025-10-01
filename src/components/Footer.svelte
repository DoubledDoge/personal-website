<script>
    // Import SCSS styles
    import '../styles/components/footer.scss'

    let currentYear = $state(new Date().getFullYear())

    let siteInfo = $state({
        name: 'Dihan Britz',
        githubRepo: 'https://github.com/DoubledDoge/personal-website',
        licenseUrl: 'https://github.com/DoubledDoge/personal-website/blob/main/LICENSE',
    })

    $effect(() => {
        const interval = setInterval(() => {
            const newYear = new Date().getFullYear()
            if (newYear !== currentYear) {
                currentYear = newYear
            }
        }, 604800000) // Check every week
        return () => clearInterval(interval)
    })
</script>

<footer aria-label="Site footer" class="footer-container">
    <div class="footer-content">
        <div class="footer-brand-section">
            <h2 class="footer-brand-title">
                {siteInfo.name}
            </h2>
        </div>

        <div class="footer-info-section">
            <p class="footer-copyright">
                © {currentYear}
                {siteInfo.name}
            </p>

            <p class="footer-license-text">
                <a
                        aria-label="View MIT License on GitHub (opens in new tab)"
                        class="footer-license-link"
                        href={siteInfo.licenseUrl}
                        rel="noopener noreferrer"
                        target="_blank"
                >
                    Open source under MIT License

                    <svg
                            aria-hidden="true"
                            class="footer-external-icon"
                            height="14"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            viewBox="0 0 24 24"
                            width="14"
                    >
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                        <polyline points="15,3 21,3 21,9"/>
                        <line x1="10" x2="21" y1="14" y2="3"/>
                    </svg>
                </a>
            </p>
        </div>
    </div>

    <div class="footer-decoration"></div>
</footer>