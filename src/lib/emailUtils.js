/**
 * EmailJS utility function for handling email sending and validation
 * Centralizes all email-related functionality across the application
 */

// Environment configuration
const EMAILJS_CONFIG = {
    publicKey: import.meta.env?.VITE_EMAILJS_PUBLIC_KEY,
    templateId: import.meta.env?.VITE_EMAILJS_TEMPLATE_ID,
    serviceId: import.meta.env?.VITE_EMAILJS_SERVICE_ID,
}

// Global EmailJS module reference
let emailjsModule = null
let isInitialized = false

/**
 * Dynamically imports and initializes EmailJS
 * @returns {Promise<Object|null>} EmailJS module or null if failed
 */
export async function loadEmailJSAsync() {
    try {
        // Return an existing module if already loaded
        if (emailjsModule && isInitialized) {
            return emailjsModule
        }

        // Dynamically import EmailJS to avoid blocking the initial render
        const emailjsImport = await import('@emailjs/browser')
        emailjsModule = emailjsImport.default

        if (!EMAILJS_CONFIG.publicKey) {
            console.warn('⚠️ EmailJS public key not configured')
            return null
        }

        // Initialize EmailJS
        emailjsModule.init(EMAILJS_CONFIG.publicKey)
        isInitialized = true
        console.info('📧 EmailJS initialized successfully')

        return emailjsModule
    } catch (error) {
        console.warn('⚠️ EmailJS initialization failed:', error)
        return null
    }
}

/**
 * Validates email address format using RFC-compliant regex
 * @param {string} email - Email address to validate
 * @returns {boolean} True if email format is valid
 */
export function validateEmail(email) {
    if (!email || typeof email !== 'string') {
        return false
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return emailRegex.test(email.trim())
}

/**
 * Sanitizes input to prevent XSS attacks
 * @param {string} input - Input string to sanitize
 * @returns {string} Sanitized string
 */
export function sanitizeInput(input) {
    if (!input || typeof input !== 'string') {
        return ''
    }

    return input
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;')
        .trim()
}

/**
 * Checks if user has exceeded rate limit for form submissions
 * Uses localStorage to track submission count and timing
 * @param {number} maxSubmissions - Maximum submissions allowed per day (default: 5)
 * @returns {boolean} True if rate limited
 */
export function isRateLimited(maxSubmissions = 5) {
    if (typeof window === 'undefined') {
        return false
    }

    try {
        const now = Date.now()
        const lastSubmit = localStorage.getItem('lastFormSubmit')
        const submitCount = Number(localStorage.getItem('formSubmitCount') || '0')

        // Reset counter if last submit was more than 24 hours ago
        if (lastSubmit && now - Number(lastSubmit) > 24 * 60 * 60 * 1000) {
            localStorage.setItem('formSubmitCount', '0')
            localStorage.setItem('lastFormSubmit', now.toString())
            return false
        }

        // Check if limit exceeded
        if (submitCount >= maxSubmissions) {
            return true
        }

        // Update submission count
        localStorage.setItem('formSubmitCount', (submitCount + 1).toString())
        localStorage.setItem('lastFormSubmit', now.toString())
        return false
    } catch (error) {
        console.warn('⚠️ Rate limiting check failed:', error)
        return false
    }
}

/**
 * Validates form data for email sending
 * @param {Object} formData - Form data object
 * @param {string} formData.email - Email address
 * @param {string} formData.subject - Email subject
 * @param {string} formData.message - Email message
 * @returns {Object} Validation result with isValid boolean and the error message
 */
export function validateFormData(formData) {
    // Check if formData exists and has required properties
    if (!formData || typeof formData !== 'object') {
        return {
            isValid: false,
            error: 'Invalid form data provided',
        }
    }

    const { email, subject, message } = formData

    // Validate email
    if (!validateEmail(email)) {
        return {
            isValid: false,
            error: 'Please enter a valid email address.',
        }
    }

    // Validate subject
    const sanitizedSubject = sanitizeInput(subject)
    if (sanitizedSubject.length < 3 || sanitizedSubject.length > 100) {
        return {
            isValid: false,
            error: 'Subject must be between 3 and 100 characters.',
        }
    }

    // Validate message
    const sanitizedMessage = sanitizeInput(message)
    if (sanitizedMessage.length < 10 || sanitizedMessage.length > 1000) {
        return {
            isValid: false,
            error: 'Message must be between 10 and 1000 characters.',
        }
    }

    return {
        isValid: true,
        error: null,
        sanitizedData: {
            email: sanitizeInput(email),
            subject: sanitizedSubject,
            message: sanitizedMessage,
        },
    }
}

/**
 * Sends email using EmailJS with comprehensive error handling
 * @param {Object} formData - Form data object
 * @param {string} formData.email - Sender's email address
 * @param {string} formData.subject - Email subject
 * @param {string} formData.message - Email message content
 * @param {string} recipientEmail - Recipient email address (default: dbritz22@proton.me)
 * @returns {Promise<Object>} Result object with success boolean and message
 */
export async function sendEmail(formData, recipientEmail = 'dbritz22@proton.me') {
    try {
        console.info('📤 Email sending process started')

        // Ensure EmailJS is loaded and initialized
        const emailjs = await loadEmailJSAsync()
        if (!emailjs) {
            return {
                success: false,
                message: 'Email service is not properly configured. Please try again later.',
            }
        }

        // Validate configuration
        if (!EMAILJS_CONFIG.serviceId || !EMAILJS_CONFIG.templateId) {
            console.error('❌ EmailJS configuration missing')
            return {
                success: false,
                message: 'Email service is not properly configured. Please try again later.',
            }
        }

        // Check rate limiting
        if (isRateLimited()) {
            console.warn('⚠️ Rate limit exceeded for email sending')
            return {
                success: false,
                message:
                    'Rate limit exceeded. Please wait 24 hours before sending another message.',
            }
        }

        // Validate and sanitize form data
        const validation = validateFormData(formData)
        if (!validation.isValid) {
            console.warn('⚠️ Form validation failed:', validation.error)
            return {
                success: false,
                message: validation.error,
            }
        }

        const { email, subject, message } = validation.sanitizedData

        // Prepare email template parameters
        const templateParams = {
            from_email: email,
            subject: subject,
            message: message,
            to_email: recipientEmail,
            reply_to: email,
        }

        // Send email using EmailJS
        await emailjs.send(
            EMAILJS_CONFIG.serviceId,
            EMAILJS_CONFIG.templateId,
            templateParams,
            EMAILJS_CONFIG.publicKey
        )

        console.info('✅ Email sent successfully')
        return {
            success: true,
            message: "Message sent successfully! I'll get back to you soon.",
        }
    } catch (error) {
        console.error('❌ Email sending failed:', error)

        return {
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : 'Failed to send message. Please try again or use direct email.',
        }
    }
}

/**
 * Checks if EmailJS is properly configured
 * @returns {boolean} True if all required configuration is present
 */
export function isEmailJSConfigured() {
    return !!(EMAILJS_CONFIG.publicKey && EMAILJS_CONFIG.serviceId && EMAILJS_CONFIG.templateId)
}

/**
 * Gets the current EmailJS initialization status
 * @returns {Object} Status object with initialization state and module reference
 */
export function getEmailJSStatus() {
    return {
        isInitialized,
        isConfigured: isEmailJSConfigured(),
        hasModule: !!emailjsModule,
    }
}
