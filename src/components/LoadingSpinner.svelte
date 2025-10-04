<script lang="ts">
    import '$styles/components/loading-spinner.scss'

    interface Props {
        label?: string
        size?: 'small' | 'default' | 'large'
        variant?: 'default' | 'overlay' | 'inline'
        showText?: boolean
        text?: string
    }

    let {
        label = 'Loading content',
        size = 'default',
        variant = 'default',
        showText = false,
        text = 'Loading...',
    }: Props = $props()

    /**
     * Generates a unique gradient ID for the spinner to avoid conflicts
     * when multiple spinners are rendered on the same page
     */
    let gradientId: string = $derived(
            `spinner-gradient-${Math.random().toString(36).substring(2, 9)}`
    )

    /**
     * Computes CSS classes for the spinner based on variant and size props
     */
    let spinnerClasses = $derived((): string => {
        const classes: string[] = []

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

        <circle
                class="loading-spinner-track"
                cx="12"
                cy="12"
                fill="none"
                r="10"
                stroke="url(#{gradientId})"
        />

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

    <span class="sr-only">{label}</span>
</div>
