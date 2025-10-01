<script>
    // Import SCSS styles
    import '../styles/components/loading-spinner.scss'

    // Props with default values and variants
    let {
        label = 'Loading content',
        size = 'default', // 'sm', 'default', 'lg', 'xl'
        variant = 'default', // 'default', 'overlay', 'inline'
        showText = false,
        text = 'Loading...'
    } = $props()

    // Generate unique gradient ID to avoid conflicts
    let gradientId = $derived(`spinner-gradient-${Math.random().toString(36).substring(2, 9)}`)

    // Compute classes based on props
    let spinnerClasses = $derived(() => {
        let classes = []

        if (variant === 'overlay') {
            classes.push('loading-spinner-overlay')
        } else if (variant === 'inline') {
            classes.push('loading-spinner-inline')
        } else {
            classes.push('loading-spinner')
        }

        if (size !== 'default') {
            classes.push(`size-${size}`)
        }

        return classes.join(' ')
    })
</script>

<div class={spinnerClasses}>
    <svg
            aria-hidden="false"
            aria-label={label}
            class="loading-spinner-svg"
            role="img"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
    >
        <defs>
            <linearGradient id={gradientId} x1="0%" x2="100%" y1="0%" y2="100%">
                <stop offset="0%" stop-color="#f59e0b"/>
                <stop offset="50%" stop-color="#fbbf24"/>
                <stop offset="100%" stop-color="#ec4899"/>
            </linearGradient>
        </defs>

        <!-- Spinner track (background circle) -->
        <circle
                class="loading-spinner-track"
                cx="12"
                cy="12"
                fill="none"
                r="10"
                stroke="url(#{gradientId})"
        />

        <!-- Spinner indicator (moving part) -->
        <path
                class="loading-spinner-indicator"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                fill="url(#{gradientId})"
        />
    </svg>

    {#if showText && text}
        <div class="loading-spinner-text">
            {text}
        </div>
    {/if}

    <span class="loading-spinner-sr-only">{label}</span>
</div>