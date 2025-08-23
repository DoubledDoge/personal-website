<script>
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

<!-- Site footer with copyright information -->
<footer
    class="footer-container relative z-10 mt-8 border-t border-[var(--color-dark-700/50)] bg-gray-900/50 backdrop-blur-sm"
    aria-label="Site footer"
>
    <div
        class="container-responsive flex flex-col items-center justify-between py-8 md:flex-row md:py-12"
    >
        <!-- Site brand/logo -->
        <div class="footer-brand mb-6 text-center md:mb-0 md:text-left">
            <h2
                class="hover:text-gradient hover:text-glow text-2xl font-bold text-white transition-all duration-300 md:text-3xl"
            >
                {siteInfo.name}
            </h2>
        </div>

        <!-- Copyright and license information -->
        <div class="footer-info text-center text-gray-400 md:text-right">
            <!-- Copyright notice -->
            <p class="mb-2 text-base font-medium">
                © {currentYear}
                {siteInfo.name}
            </p>

            <!-- License information -->
            <p class="text-sm">
                <a
                    href={siteInfo.licenseUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="footer-link inline-flex items-center gap-1 transition-all duration-300 hover:text-white focus:text-white"
                    aria-label="View MIT License on GitHub (opens in new tab)"
                >
                    Open source under MIT License

                    <!-- External link icon -->
                    <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="ml-1 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        aria-hidden="true"
                    >
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15,3 21,3 21,9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                </a>
            </p>
        </div>
    </div>

    <!-- Subtle decorative element -->
    <div
        class="footer-decoration via-primary/30 absolute bottom-0 left-0 h-0.5 w-full bg-gradient-to-r from-transparent to-transparent"
    ></div>
</footer>

<style>
    /* Footer container styling */
    .footer-container {
        background: linear-gradient(180deg, rgba(17, 24, 39, 0.8) 0%, rgba(17, 24, 39, 0.95) 100%);
        backdrop-filter: blur(10px);
        border-top: 1px solid rgba(107, 114, 128, 0.3);
    }

    /* Enhanced brand hover effect */
    .footer-brand h2:hover {
        text-shadow: 0 0 20px rgba(245, 158, 11, 0.5);
        background: linear-gradient(45deg, var(--color-primary), var(--color-secondary));
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
        transform: translateY(-2px);
    }

    /* Footer link styling */
    .footer-link {
        position: relative;
        display: inline-flex;
        align-items: center;
        padding: 0.25rem 0.5rem;
        border-radius: 0.375rem;
        transition: all 0.3s ease;
    }

    .footer-link:hover,
    .footer-link:focus {
        background-color: rgba(107, 114, 128, 0.1);
        transform: translateY(-1px);
    }

    /* Enhanced focus states for accessibility */
    .footer-link:focus {
        outline: 2px solid var(--color-primary);
        outline-offset: 2px;
    }

    /* Subtle animation for the decorative line */
    .footer-decoration {
        animation: pulseGlow 3s ease-in-out infinite;
    }

    @keyframes pulseGlow {
        0%,
        100% {
            opacity: 0.3;
        }
        50% {
            opacity: 0.6;
        }
    }

    /* Responsive typography adjustments */
    @media (max-width: 768px) {
        .footer-info {
            max-width: 280px;
        }

        .footer-brand h2 {
            font-size: 1.75rem;
        }
    }

    /* Enhanced hover state for external link icon */
    .footer-link:hover svg {
        transform: translate(2px, -2px);
        color: var(--color-primary);
    }

    /* Print styles */
    @media print {
        .footer-container {
            background: none;
            backdrop-filter: none;
            border: none;
        }

        .footer-decoration {
            display: none;
        }

        .footer-link svg {
            display: none;
        }
    }

    /* High contrast mode support */
    @media (prefers-contrast: more) {
        .footer-container {
            background: var(--color-dark-100);
            border-top: 2px solid var(--color-primary);
        }

        .footer-link {
            border: 1px solid transparent;
        }

        .footer-link:hover,
        .footer-link:focus {
            border-color: var(--color-primary);
            background: var(--color-dark-200);
        }
    }

    /* Reduced motion preferences */
    @media (prefers-reduced-motion: reduce) {
        .footer-brand h2,
        .footer-link,
        .footer-link svg {
            transition: none;
        }

        .footer-decoration {
            animation: none;
        }

        .footer-brand h2:hover,
        .footer-link:hover {
            transform: none;
        }
    }
</style>
