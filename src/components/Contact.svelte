<script lang="ts">
    import { onMount } from 'svelte'
    import contactsData from '$data/contacts.json'
    import { isEmailJSConfigured, sendEmail, validateEmail } from '$lib/emailUtils'
    import '$styles/components/contact.scss'

    interface Props {
        emailjsReady?: boolean
    }

    interface ContactFormData {
        email: string
        subject: string
        message: string

        [key: string]: string
    }

    interface SubmitStatus {
        type: 'success' | 'error'
        message: string
    }

    type ValidationClass = 'default' | 'valid' | 'invalid'

    let { emailjsReady = false }: Props = $props()

    let formData: ContactFormData = $state({
        email: '',
        subject: '',
        message: '',
    })

    let isSubmitting: boolean = $state(false)
    let submitStatus: SubmitStatus | null = $state(null)
    let statusTimeoutId: ReturnType<typeof setTimeout> | null = $state(null)

    /**
     * Validates if the form has all required fields with minimum lengths
     */
    const isFormValid: boolean = $derived(
        formData.email.length > 0 && formData.subject.length >= 3 && formData.message.length >= 10
    )

    /**
     * Determines if the form can be submitted based on validation and service availability
     */
    const canSubmitForm: boolean = $derived(
        isFormValid && emailjsReady && isEmailJSConfigured() && !isSubmitting
    )

    /**
     * Calculates form completion percentage based on field validation
     */
    const formCompletionPercentage = $derived((): number => {
        let completed = 0
        if (formData.email.length > 0) completed += 33
        if (formData.subject.length >= 3) completed += 33
        if (formData.message.length >= 10) completed += 34
        return Math.min(completed, 100)
    })

    /**
     * Returns CSS class for email field validation state
     */
    const getEmailValidationClass = $derived((): ValidationClass => {
        if (formData.email.length === 0) return 'default'
        return validateEmail(formData.email) ? 'valid' : 'invalid'
    })

    /**
     * Returns CSS class for subject field validation state
     */
    const getSubjectValidationClass = $derived((): ValidationClass => {
        if (formData.subject.length === 0) return 'default'
        return formData.subject.length >= 3 ? 'valid' : 'invalid'
    })

    /**
     * Returns CSS class for message field validation state
     */
    const getMessageValidationClass = $derived((): ValidationClass => {
        if (formData.message.length === 0) return 'default'
        return formData.message.length >= 10 ? 'valid' : 'invalid'
    })

    onMount((): void => {
        if (!isEmailJSConfigured()) {
            submitStatus = {
                type: 'error',
                message: 'Contact form configuration missing. Please use direct email instead.',
            }
        }
    })

    /**
     * Handles form submission with email service integration
     * @param event - The form submit event
     */
    async function handleSubmit(event: SubmitEvent): Promise<void> {
        event.preventDefault()

        try {
            isSubmitting = true
            submitStatus = null

            const result = await sendEmail(formData)

            if (result.success) {
                submitStatus = {
                    type: 'success',
                    message: result.message,
                }

                formData = {
                    email: '',
                    subject: '',
                    message: '',
                }
            } else {
                submitStatus = {
                    type: 'error',
                    message: result.message,
                }
            }

            scheduleStatusClear(submitStatus)
        } catch {
            submitStatus = {
                type: 'error',
                message: 'An unexpected error occurred. Please try again or use direct email.',
            }
            scheduleStatusClear(submitStatus)
        } finally {
            isSubmitting = false
        }
    }

    /**
     * Schedules automatic clearing of the status message after a delay
     * @param status - The status object to clear
     */
    function scheduleStatusClear(status: SubmitStatus): void {
        if (statusTimeoutId) {
            clearTimeout(statusTimeoutId)
        }

        statusTimeoutId = setTimeout((): void => {
            if (submitStatus === status) {
                submitStatus = null
            }
            statusTimeoutId = null
        }, 5000)
    }

    $effect((): void => {
        if (submitStatus?.type === 'success') {
            const announcement: HTMLDivElement = document.createElement('div')
            announcement.setAttribute('aria-live', 'polite')
            announcement.setAttribute('aria-atomic', 'true')
            announcement.className = 'sr-only'
            announcement.textContent = 'Message sent successfully!'
            document.body.appendChild(announcement)
            setTimeout((): HTMLDivElement => document.body.removeChild(announcement), 1000)
        }
    })
</script>

<section class="contact-section" id="contact">
    <div class="section-header">
        <h2 class="contact-title">Let's Connect</h2>
    </div>

    <div class="contact-content-grid">
        <div class="contact-info-column">
            <p class="contact-intro-text">
                You can contact me using one of these methods found below:
            </p>

            <div class="contact-methods-list">
                {#each contactsData.contacts as contact (contact.id)}
                    <div class="contact-method-item">
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

                        <div class="contact-method-details">
                            <h4 class="contact-method-title">
                                {contact.header}
                            </h4>
                            <a
                                href={contact.link}
                                target={contact.external ? '_blank' : undefined}
                                rel={contact.external ? 'noopener noreferrer' : undefined}
                                class="contact-method-link"
                            >
                                {contact.contactText}
                            </a>
                        </div>
                    </div>
                {/each}
            </div>
        </div>

        <div class="contact-form-container">
            <form onsubmit={handleSubmit} class="contact-form" novalidate>
                <div class="form-field-group">
                    <label for="email" class="form-label">
                        Email Address
                        <span aria-label="required" class="form-required-indicator">*</span>
                    </label>
                    <input
                        autocomplete="email"
                        bind:value={formData.email}
                        class="form-input {getEmailValidationClass()}"
                        disabled={isSubmitting}
                        id="email"
                        name="email"
                        placeholder="your.email@example.com"
                        required
                        type="email"
                    />
                </div>

                <div class="form-field-group">
                    <label for="subject" class="form-label">
                        Subject
                        <span aria-label="required" class="form-required-indicator">*</span>
                    </label>
                    <input
                        bind:value={formData.subject}
                        class="form-input {getSubjectValidationClass()}"
                        disabled={isSubmitting}
                        id="subject"
                        maxlength="100"
                        name="subject"
                        placeholder="What would you like to discuss?"
                        required
                        type="text"
                    />
                </div>

                <div class="form-field-group flex-grow">
                    <label for="message" class="form-label">
                        Message
                        <span aria-label="required" class="form-required-indicator">*</span>
                    </label>
                    <textarea
                        bind:value={formData.message}
                        class="form-input form-textarea {getMessageValidationClass()}"
                        disabled={isSubmitting}
                        id="message"
                        maxlength="1000"
                        name="message"
                        placeholder="Let's talk about..."
                        required
                        rows="6"
                    ></textarea>
                </div>

                <div class="form-submit-section">
                    {#if formCompletionPercentage() > 0 && formCompletionPercentage() < 100}
                        <div class="form-progress-container">
                            <div class="form-progress-header">
                                <span>Form completion</span>
                                <span>{formCompletionPercentage()}%</span>
                            </div>
                            <div class="form-progress-track">
                                <div
                                    class="form-progress-bar"
                                    style="width: {formCompletionPercentage()}%"
                                ></div>
                            </div>
                        </div>
                    {/if}

                    <button
                        class="form-submit-button {canSubmitForm ? 'enabled' : ''}"
                        disabled={!canSubmitForm}
                        type="submit"
                    >
                        {#if isSubmitting}
                            <span class="form-submit-content">
                                <svg
                                    class="form-loading-spinner"
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

                {#if submitStatus}
                    <div class="form-status-message {submitStatus.type}" role="alert">
                        <div class="form-status-content">
                            {#if submitStatus.type === 'success'}
                                <svg
                                    class="form-status-icon success"
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
                                    class="form-status-icon error"
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
                            <span class="form-status-text">{submitStatus.message}</span>
                        </div>
                    </div>
                {/if}
            </form>
        </div>
    </div>
</section>
