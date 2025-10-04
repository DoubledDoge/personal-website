interface EmailJSConfig {
    publicKey: string | undefined
    templateId: string | undefined
    serviceId: string | undefined
}

interface ContactFormData extends Record<string, unknown> {
    email: string
    subject: string
    message: string
}

interface SanitizedFormData {
    email: string
    subject: string
    message: string
}

interface ValidationResult {
    isValid: boolean
    error: string | null
    sanitizedData?: SanitizedFormData
}

interface EmailResult {
    success: boolean
    message: string
}

interface EmailJSModule {
    init: (publicKey: string) => void
    send: (
        serviceId: string,
        templateId: string,
        templateParams?: Record<string, unknown>,
        publicKey?: string
    ) => Promise<{ status: number; text: string }>
}

interface TemplateParams extends Record<string, string> {
    from_email: string
    subject: string
    message: string
    to_email: string
    reply_to: string
}

const EMAILJS_CONFIG: EmailJSConfig = {
    // @ts-expect-error: Vite injects these env vars at build time
    publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
    // @ts-expect-error: Vite injects these env vars at build time
    templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
    // @ts-expect-error: Vite injects these env vars at build time
    serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
}

let emailjsModule: EmailJSModule | null = null
let isInitialized = false

/**
 * Dynamically imports and initializes EmailJS
 * @returns Promise that resolves to EmailJS module or null if failed
 */
export async function loadEmailJSAsync(): Promise<EmailJSModule | null> {
    try {
        if (emailjsModule && isInitialized) {
            return emailjsModule
        }

        const emailjsImport = await import('@emailjs/browser')
        const importedModule = emailjsImport.default

        if (!EMAILJS_CONFIG.publicKey) {
            return null
        }

        importedModule.init(EMAILJS_CONFIG.publicKey)
        emailjsModule = importedModule
        isInitialized = true

        return emailjsModule
    } catch {
        return null
    }
}

/**
 * Validates email address format using RFC-compliant regex
 * @param email - Email address to validate
 * @returns True if email format is valid
 */
export function validateEmail(email: string): boolean {
    if (!email) {
        return false
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return emailRegex.test(email.trim())
}

/**
 * Sanitizes input to prevent XSS attacks by escaping HTML characters
 * @param input - Input string to sanitize
 * @returns Sanitized string with HTML characters escaped
 */
export function sanitizeInput(input: string): string {
    if (!input) {
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
 * @param maxSubmissions - Maximum submissions allowed per day (default: 5)
 * @returns True if rate limited
 */
export function isRateLimited(maxSubmissions = 5): boolean {
    if (typeof window === 'undefined') {
        return false
    }

    try {
        const now: number = Date.now()
        const lastSubmit: string | null = localStorage.getItem('lastFormSubmit')
        const submitCount = Number(localStorage.getItem('formSubmitCount') || '0')

        if (lastSubmit && now - Number(lastSubmit) > 24 * 60 * 60 * 1000) {
            localStorage.setItem('formSubmitCount', '0')
            localStorage.setItem('lastFormSubmit', now.toString())
            return false
        }

        if (submitCount >= maxSubmissions) {
            return true
        }

        localStorage.setItem('formSubmitCount', (submitCount + 1).toString())
        localStorage.setItem('lastFormSubmit', now.toString())
        return false
    } catch {
        return false
    }
}

/**
 * Type guard to check if the object has ContactFormData structure
 * @param data - Object to check
 * @returns True if the object has required ContactFormData properties
 */
function isContactFormData(data: Record<string, unknown>): data is ContactFormData {
    return (
        typeof data.email === 'string' &&
        typeof data.subject === 'string' &&
        typeof data.message === 'string'
    )
}

/**
 * Validates form data for email sending with comprehensive checks
 * @param formData - Form data object to validate
 * @returns Validation result with isValid boolean, error message, and sanitized data
 */
export function validateFormData(formData: unknown): ValidationResult {
    if (!formData || typeof formData !== 'object') {
        return {
            isValid: false,
            error: 'Invalid form data provided',
        }
    }

    const data = formData as Record<string, unknown>

    if (!isContactFormData(data)) {
        return {
            isValid: false,
            error: 'Missing required form fields',
        }
    }

    if (!validateEmail(data.email)) {
        return {
            isValid: false,
            error: 'Please enter a valid email address.',
        }
    }

    const sanitizedSubject: string = sanitizeInput(data.subject)
    if (sanitizedSubject.length < 3 || sanitizedSubject.length > 100) {
        return {
            isValid: false,
            error: 'Subject must be between 3 and 100 characters.',
        }
    }

    const sanitizedMessage: string = sanitizeInput(data.message)
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
            email: sanitizeInput(data.email),
            subject: sanitizedSubject,
            message: sanitizedMessage,
        },
    }
}

/**
 * Sends email using EmailJS with comprehensive error handling and validation
 * @param formData - Form data object containing email, subject, and message
 * @param recipientEmail - Recipient email address (default: 'dbritz22@proton.me')
 * @returns Promise that resolves to the result object with success boolean and message
 */
export async function sendEmail(
    formData: ContactFormData,
    recipientEmail = 'dbritz22@proton.me'
): Promise<EmailResult> {
    try {
        const emailjs: EmailJSModule | null = await loadEmailJSAsync()
        if (!emailjs) {
            return {
                success: false,
                message: 'Email service is not properly configured. Please try again later.',
            }
        }

        if (!EMAILJS_CONFIG.serviceId || !EMAILJS_CONFIG.templateId || !EMAILJS_CONFIG.publicKey) {
            return {
                success: false,
                message: 'Email service is not properly configured. Please try again later.',
            }
        }

        if (isRateLimited()) {
            return {
                success: false,
                message:
                    'Rate limit exceeded. Please wait 24 hours before sending another message.',
            }
        }

        const validation: ValidationResult = validateFormData(formData)
        if (!validation.isValid || !validation.sanitizedData) {
            return {
                success: false,
                message: validation.error || 'Validation failed',
            }
        }

        const { email, subject, message } = validation.sanitizedData

        const templateParams: TemplateParams = {
            from_email: email,
            subject: subject,
            message: message,
            to_email: recipientEmail,
            reply_to: email,
        }

        await emailjs.send(
            EMAILJS_CONFIG.serviceId,
            EMAILJS_CONFIG.templateId,
            templateParams,
            EMAILJS_CONFIG.publicKey
        )

        return {
            success: true,
            message: "Message sent successfully! I'll get back to you soon.",
        }
    } catch (error: unknown) {
        const errorMessage: string =
            error instanceof Error
                ? error.message
                : 'Failed to send message. Please try again or use direct email.'

        return {
            success: false,
            message: errorMessage,
        }
    }
}

/**
 * Checks if EmailJS is properly configured with all required environment variables
 * @returns True if all required configuration is present
 */
export function isEmailJSConfigured(): boolean {
    return !!(EMAILJS_CONFIG.publicKey && EMAILJS_CONFIG.serviceId && EMAILJS_CONFIG.templateId)
}
