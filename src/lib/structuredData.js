/**
 * Loads and injects structured data into the document head
 * @param {string} jsonPath - Path to the structured data JSON file
 * @returns {Promise<Object|null>} The structured data object or null if failed
 */
export async function loadStructuredData(jsonPath = '/personal-website/structured-data.json') {
    try {
        const response = await fetch(jsonPath)

        if (!response.ok) {
            console.warn(`⚠️ Failed to fetch structured data: HTTP ${response.status}`)
            return null
        }

        const data = await response.json()

        // Create and inject the script tag
        const script = document.createElement('script')
        script.type = 'application/ld+json'
        script.textContent = JSON.stringify(data, null, 2)

        // Remove any existing structured data script
        const existingScript = document.querySelector('script[type="application/ld+json"]')
        if (existingScript) {
            existingScript.remove()
        }

        document.head.appendChild(script)
        console.info('✅ Structured data loaded successfully')

        return data
    } catch (error) {
        console.warn('⚠️ Failed to load structured data:', error)
        return null
    }
}
