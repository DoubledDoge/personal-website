<script>
    import emailjs from '@emailjs/browser'
    import { onMount } from 'svelte'
    import contactsData from '../data/contacts.json'

    // Environment variables for EmailJS configuration
    const EMAILJS_PUBLIC_KEY = import.meta.env?.VITE_EMAILJS_PUBLIC_KEY
    const EMAILJS_TEMPLATE_ID = import.meta.env?.VITE_EMAILJS_TEMPLATE_ID
    const EMAILJS_SERVICE_ID = import.meta.env?.VITE_EMAILJS_SERVICE_ID

    let formData = $state({
        email: '',
        subject: '',
        message: '',
    })

    let isSubmitting = $state(false)
    let submitStatus = $state(null)
    let emailjsInitialized = $state(false)
    let statusTimeoutId = $state(null)

    // Derived states for form validation and UI feedback
    const isFormValid = $derived(
        formData.email.length > 0 && formData.subject.length >= 3 && formData.message.length >= 10
    )

    const canSubmitForm = $derived(isFormValid && emailjsInitialized && !isSubmitting)

    const formCompletionPercentage = $derived(() => {
        let completed = 0
        if (formData.email.length > 0) completed += 33
        if (formData.subject.length >= 3) completed += 33
        if (formData.message.length >= 10) completed += 34
        return Math.min(completed, 100)
    })

    onMount(() => {
        if (EMAILJS_PUBLIC_KEY) {
            try {
                emailjs.init(EMAILJS_PUBLIC_KEY)
                emailjsInitialized = true
                console.info('📧 EmailJS initialized for contact form')
            } catch (error) {
                console.warn('⚠️ EmailJS initialization failed:', error)
                submitStatus = {
                    type: 'error',
                    message:
                        'Contact form is temporarily unavailable. Please use direct email instead.',
                }
            }
        } else {
            console.warn('⚠️ EmailJS public key not configured')
            submitStatus = {
                type: 'error',
                message: 'Contact form configuration missing. Please use direct email instead.',
            }
        }
    })

    /**
     * Validate email address format
     * @param {string} email
     * @returns {boolean}
     */
    function validateEmail(email) {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        return emailRegex.test(email)
    }

    /**
     * Sanitize input to prevent XSS attacks
     * @param {string} input
     * @returns {string}
     */
    function sanitizeInput(input) {
        return input
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;')
            .trim()
    }

    /**
     * Check if user has exceeded rate limit
     * @returns {boolean}
     */
    function isRateLimited() {
        if (typeof window === 'undefined') return false

        const now = Date.now()
        const lastSubmit = localStorage.getItem('lastFormSubmit')
        const submitCount = Number(localStorage.getItem('formSubmitCount') || '0')

        // Reset counter if last submit was more than 24 hours ago
        if (lastSubmit && now - Number(lastSubmit) > 24 * 60 * 60 * 1000) {
            localStorage.setItem('formSubmitCount', '0')
            localStorage.setItem('lastFormSubmit', now.toString())
            return false
        }

        // Allow max 5 submissions per day
        if (submitCount >= 5) {
            return true
        }

        // Update submission count
        localStorage.setItem('formSubmitCount', (submitCount + 1).toString())
        localStorage.setItem('lastFormSubmit', now.toString())
        return false
    }

    /**
     * Handle form submission
     * @param {Event} event
     */
    async function handleSubmit(event) {
        event.preventDefault()

        try {
            // Set loading state
            isSubmitting = true
            submitStatus = null
            console.info('📤 Contact form submission started')

            // Check if EmailJS is properly initialized
            if (!emailjsInitialized || !EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID) {
                submitStatus = {
                    type: 'error',
                    message: 'Email service is not properly configured. Please try again later.',
                }
                console.error('❌ EmailJS configuration error')
                return
            }

            // Check for rate limiting
            if (isRateLimited()) {
                submitStatus = {
                    type: 'error',
                    message:
                        'Rate limit exceeded. Please wait 24 hours before sending another message.',
                }
                console.warn('⚠️ Rate limit exceeded for contact form')
                return
            }

            // Validate email format
            if (!validateEmail(formData.email)) {
                submitStatus = {
                    type: 'error',
                    message: 'Please enter a valid email address.',
                }
                console.warn('⚠️ Invalid email format:', formData.email)
                return
            }

            // Sanitize inputs to prevent XSS
            const sanitizedSubject = sanitizeInput(formData.subject)
            const sanitizedMessage = sanitizeInput(formData.message)
            const sanitizedEmail = sanitizeInput(formData.email)

            // Validate input lengths
            if (sanitizedSubject.length < 3 || sanitizedSubject.length > 100) {
                submitStatus = {
                    type: 'error',
                    message: 'Subject must be between 3 and 100 characters.',
                }
                console.warn('⚠️ Invalid subject length:', sanitizedSubject.length)
                return
            }

            if (sanitizedMessage.length < 10 || sanitizedMessage.length > 1000) {
                submitStatus = {
                    type: 'error',
                    message: 'Message must be between 10 and 1000 characters.',
                }
                console.warn('⚠️ Invalid message length:', sanitizedMessage.length)
                return
            }

            // Prepare email parameters
            const templateParams = {
                from_email: sanitizedEmail,
                subject: sanitizedSubject,
                message: sanitizedMessage,
                to_email: 'dbritz22@proton.me',
                reply_to: sanitizedEmail,
            }

            // Send email using EmailJS
            await emailjs.send(
                EMAILJS_SERVICE_ID,
                EMAILJS_TEMPLATE_ID,
                templateParams,
                EMAILJS_PUBLIC_KEY
            )

            console.info('✅ Contact form email sent successfully')

            // Set success status
            submitStatus = {
                type: 'success',
                message: "Message sent successfully! I'll get back to you soon.",
            }

            // Schedule status clearing
            scheduleStatusClear(submitStatus)

            // Reset form after successful submission
            formData = {
                email: '',
                subject: '',
                message: '',
            }
        } catch (error) {
            console.error('❌ Contact form submission failed:', error)

            // Set error status
            submitStatus = {
                type: 'error',
                message:
                    error instanceof Error
                        ? error.message
                        : 'Failed to send message. Please try again or use direct email.',
            }

            // Schedule status clearing
            scheduleStatusClear(submitStatus)
        } finally {
            // Reset loading state
            isSubmitting = false
            console.info('📋 Contact form submission process completed')
        }
    }

    /**
     * Clear status message after a delay
     * @param {Object} status
     */
    function scheduleStatusClear(status) {
        // Clear any existing timeout
        if (statusTimeoutId) {
            clearTimeout(statusTimeoutId)
        }

        // Set a new timeout
        statusTimeoutId = setTimeout(() => {
            // Only clear if the status hasn't changed
            if (submitStatus === status) {
                submitStatus = null
            }
            statusTimeoutId = null
        }, 5000)
    }

    // Effect to track form progress and provide user feedback
    $effect(() => {
        if (formCompletionPercentage() === 100 && canSubmitForm) {
            console.info('📝 Contact form is ready for submission')
        }
    })

    // Effect to handle EmailJS initialization status changes
    $effect(() => {
        if (emailjsInitialized) {
            console.info('✅ Contact form is now ready to receive submissions')
        }
    })

    // Effect for accessibility announcements
    $effect(() => {
        if (submitStatus?.type === 'success') {
            // Announce success to screen readers
            const announcement = document.createElement('div')
            announcement.setAttribute('aria-live', 'polite')
            announcement.setAttribute('aria-atomic', 'true')
            announcement.className = 'visually-hidden'
            announcement.textContent = 'Message sent successfully!'
            document.body.appendChild(announcement)
            setTimeout(() => document.body.removeChild(announcement), 1000)
        }
    })
</script>

<!-- Contact section with contact info and contact form -->
<section class="section-container" id="contact">
    <!-- Section header -->
    <div class="section-header">
        <h2 class="section-title">Let's Connect</h2>
    </div>
    <!-- Main content grid with contact methods and form -->
    <div class="relative grid gap-8 md:grid-cols-2">
        <!-- Contact information column -->
        <div>
            <p class="mb-8 text-lg text-gray-400">
                You can contact me using one of these methods found below:
            </p>

            <div class="space-y-6">
                <!-- Contact methods -->
                {#each contactsData.contacts as contact (contact.id)}
                    <div class="group flex items-center">
                        <div class="contact-icon-wrapper">
                            <svg
                                class="contact-icon"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                aria-hidden="true"
                            >
                                <path d={contact.icon} />
                            </svg>
                        </div>

                        <div class="ml-5 text-gray-100">
                            <h4
                                class="group-hover:text-primary mb-1 text-lg font-semibold transition-colors"
                            >
                                {contact.header}
                            </h4>
                            <a
                                href={contact.link}
                                target={contact.external ? '_blank' : undefined}
                                rel={contact.external ? 'noopener noreferrer' : undefined}
                                class="hover:text-primary text-gray-400 transition-colors"
                            >
                                {contact.contactText}
                            </a>
                        </div>
                    </div>
                {/each}
            </div>
        </div>
        <!-- Contact form container -->
        <div class="contact-form-container">
            <!-- Contact form with email submission -->
            <form onsubmit={handleSubmit} class="contact-form" novalidate>
                <!-- Email input field -->
                <div class="form-group">
                    <label for="email" class="form-label">
                        Email Address
                        <span class="ml-1 text-red-400" aria-label="required">*</span>
                    </label>
                    <input
                        bind:value={formData.email}
                        type="email"
                        id="email"
                        required
                        class="form-input"
                        class:border-green-500={formData.email.length > 0 &&
                            validateEmail(formData.email)}
                        class:border-red-500={formData.email.length > 0 &&
                            !validateEmail(formData.email)}
                        placeholder="your.email@example.com"
                        name="email"
                        autocomplete="email"
                        disabled={isSubmitting}
                    />
                </div>
                <!-- Subject input field -->
                <div class="form-group">
                    <label for="subject" class="form-label">
                        Subject
                        <span class="ml-1 text-red-400" aria-label="required">*</span>
                    </label>
                    <input
                        bind:value={formData.subject}
                        type="text"
                        id="subject"
                        required
                        class="form-input"
                        class:border-green-500={formData.subject.length >= 3}
                        class:border-red-500={formData.subject.length > 0 &&
                            formData.subject.length < 3}
                        placeholder="What would you like to discuss?"
                        name="subject"
                        disabled={isSubmitting}
                        maxlength="100"
                    />
                </div>
                <!-- Message input field -->
                <div class="form-group flex-1">
                    <label for="message" class="form-label">
                        Message
                        <span class="ml-1 text-red-400" aria-label="required">*</span>
                    </label>
                    <textarea
                        bind:value={formData.message}
                        id="message"
                        required
                        class="form-input form-textarea"
                        class:border-green-500={formData.message.length >= 10}
                        class:border-red-500={formData.message.length > 0 &&
                            formData.message.length < 10}
                        placeholder="Let's talk about..."
                        name="message"
                        rows="6"
                        disabled={isSubmitting}
                        maxlength="1000"
                    ></textarea>
                </div>
                <!-- Submit button with loading state -->
                <div class="form-submit">
                    <!-- Form progress indicator -->
                    {#if formCompletionPercentage() > 0 && formCompletionPercentage() < 100}
                        <div class="mb-3">
                            <div class="mb-1 flex justify-between text-xs text-gray-400">
                                <span>Form completion</span>
                                <span>{formCompletionPercentage()}%</span>
                            </div>
                            <div class="h-1 w-full rounded-full bg-gray-700">
                                <div
                                    class="h-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-300"
                                    style="width: {formCompletionPercentage()}%"
                                ></div>
                            </div>
                        </div>
                    {/if}
                    <button
                        type="submit"
                        disabled={!canSubmitForm}
                        class="btn-primary w-full disabled:transform-none disabled:cursor-not-allowed disabled:opacity-50 {canSubmitForm
                            ? 'cursor-pointer'
                            : ''}"
                    >
                        {#if isSubmitting}
                            <span class="inline-flex items-center">
                                <svg
                                    class="mr-3 -ml-1 h-5 w-5 animate-spin text-gray-900"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        class="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        stroke-width="4"
                                    ></circle>
                                    <path
                                        class="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                </svg>
                                Sending Message...
                            </span>
                        {:else}
                            Send Message
                        {/if}
                    </button>
                </div>
                <!-- Form submission status message -->
                {#if submitStatus}
                    <div
                        class="form-status"
                        class:status-success={submitStatus.type === 'success'}
                        class:status-error={submitStatus.type === 'error'}
                        role="alert"
                    >
                        <div class="flex items-center">
                            {#if submitStatus.type === 'success'}
                                <svg
                                    class="mr-2 h-5 w-5 flex-shrink-0"
                                    viewBox="0 0 20 20"
                                    aria-hidden="true"
                                >
                                    <path
                                        fill="currentColor"
                                        fill-rule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                        clip-rule="evenodd"
                                    ></path>
                                </svg>
                            {:else}
                                <svg
                                    class="mr-2 h-5 w-5 flex-shrink-0"
                                    viewBox="0 0 20 20"
                                    aria-hidden="true"
                                >
                                    <path
                                        fill="currentColor"
                                        fill-rule="evenodd"
                                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                        clip-rule="evenodd"
                                    ></path>
                                </svg>
                            {/if}
                            <span>{submitStatus.message}</span>
                        </div>
                    </div>
                {/if}
            </form>
        </div>
        <!-- Background decoration element -->
        <div class="contact-decoration" aria-hidden="true"></div>
    </div>
</section>

<style>
    /* Contact icon wrapper styling */
    .contact-icon-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        background: #111a3e;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        overflow: hidden;
        border: 1px solid #111a3e;
        backdrop-filter: blur(9px);
        -webkit-backdrop-filter: blur(9px);
        transition: all var(--duration-normal) ease;
    }

    .contact-icon-wrapper:hover {
        border-color: rgb(245 158 11 / 0.5);
        box-shadow: 0 0 20px rgba(245, 158, 11, 0.2);
    }

    .contact-icon {
        width: 1.5rem;
        height: 1.5rem;
        transition: transform var(--duration-normal) ease;
    }

    .group:hover .contact-icon {
        transform: scale(1.1);
    }

    .contact-form-container {
        display: flex;
        flex-direction: column;
        background: linear-gradient(135deg, #111a3e 0%, rgba(17, 26, 62, 0.8) 100%);
        border-radius: 1rem;
        border: 1px solid rgb(55 65 81 / 0.5);
        backdrop-filter: blur(12px);
        padding: 1.5rem;
        min-height: 500px;
        box-shadow: var(--shadow-card);
        transition: all var(--duration-normal) ease;
    }

    .contact-form-container:hover {
        box-shadow: var(--shadow-card-hover);
        border-color: rgb(245 158 11 / 0.2);
    }

    /* Form layout */
    .contact-form {
        display: flex;
        flex-direction: column;
        height: 100%;
        gap: 1.5rem;
    }

    .form-group {
        display: flex;
        flex-direction: column;
    }

    .form-label {
        display: block;
        margin-bottom: 0.5rem;
        font-size: 0.875rem;
        font-weight: 600;
        color: rgb(229 231 235);
    }

    .form-input {
        width: 100%;
        padding: 0.75rem;
        border-radius: 0.5rem;
        border: 1px solid rgb(75 85 99);
        background-color: rgb(31 41 55);
        color: rgb(243 244 246);
        transition: all 0.3s ease;
    }

    .form-input::placeholder {
        color: rgb(156 163 175);
    }

    .form-input:focus {
        outline: none;
        border-color: var(--color-primary);
        box-shadow: 0 0 0 2px rgb(245 158 11 / 0.2);
    }

    .form-input:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }

    /* Validation state styling */
    .form-input.border-green-500 {
        border-color: rgb(34 197 94);
        box-shadow: 0 0 0 1px rgb(34 197 94 / 0.2);
    }

    .form-input.border-red-500 {
        border-color: rgb(239 68 68);
        box-shadow: 0 0 0 1px rgb(239 68 68 / 0.2);
    }

    /* Textarea specific styling */
    .form-textarea {
        min-height: 120px;
        resize: vertical;
    }

    /* Submit button container */
    .form-submit {
        margin-top: auto;
        padding-top: 1rem;
    }

    /* Status message styling */
    .form-status {
        margin-top: 1rem;
        padding: 1rem;
        border-radius: 0.5rem;
        font-size: 0.875rem;
        font-weight: 500;
        border-left: 4px solid;
        transition: all 0.3s ease;
        animation: fadeInSlide 0.3s ease-out;
    }

    .status-success {
        background-color: rgb(5 46 22);
        color: rgb(187 247 208);
        border-left-color: rgb(34 197 94);
    }

    .status-error {
        background-color: rgb(69 10 10);
        color: rgb(254 202 202);
        border-left-color: rgb(239 68 68);
    }

    .contact-decoration {
        position: absolute;
        top: -5rem;
        left: -1rem;
        width: 20rem;
        height: 5rem;
        opacity: 0.25;
        filter: blur(2rem);
        z-index: 0;
        background: linear-gradient(135deg, #570cac 0%, var(--color-primary) 100%);
        transform: translateX(-66%) translateY(-50%);
    }

    /* Responsive adjustments */
    @media (max-width: 768px) {
        .contact-form-container {
            min-height: auto;
        }

        .contact-decoration {
            top: -2.5rem;
            width: 15rem;
            height: 4rem;
        }
    }

    /* Animation for status messages and progress */
    @keyframes fadeInSlide {
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
