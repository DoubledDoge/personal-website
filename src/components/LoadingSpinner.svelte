<script>
    let { size = 'h-16 w-16', label = 'Loading content' } = $props()

    let gradientId = $derived(`spinner-gradient-${Math.random().toString(36).substring(2, 9)}`)
</script>

<!-- Animated loading spinner with gradient colors -->
<div class="flex h-full items-center justify-center" role="status" aria-live="polite">
    <svg
        class="{size} animate-spin text-white"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        aria-label={label}
    >
        <!-- Gradient definition for the spinner with unique ID -->
        <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#f59e0b" />
                <stop offset="100%" stop-color="#ec4899" />
            </linearGradient>
        </defs>

        <!-- Spinner track (background circle) -->
        <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="url(#{gradientId})"
            stroke-width="4"
            fill="none"
        />

        <!-- Spinner indicator (moving part) -->
        <path fill="#f59e0b" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>

    <!-- Screen reader text -->
    <span class="sr-only">{label}</span>
</div>

<style>
    :global(.animate-spin) {
        animation: spin 1s linear infinite;
    }

    /* Optimized spin animation */
    @keyframes spin {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }

    /* Accessibility optimization*/
    @media (prefers-reduced-motion: reduce) {
        :global(.animate-spin) {
            animation: none;
        }
    }

    .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
    }
</style>
