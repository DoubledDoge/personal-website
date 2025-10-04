type StructuredDataObject = Record<string, unknown>

/**
 * Loads and injects structured data into the document head
 * @param jsonPath - Path to the structured data JSON file
 * @returns Promise that resolves to the structured data object or null if failed
 */
export async function loadStructuredData(
    jsonPath = '/personal-website/structured-data.json'
): Promise<StructuredDataObject | null> {
    try {
        const response: Response = await fetch(jsonPath)

        if (!response.ok) {
            return null
        }

        const data: StructuredDataObject = (await response.json()) as StructuredDataObject

        const script: HTMLScriptElement = document.createElement('script')
        script.type = 'application/ld+json'
        script.textContent = JSON.stringify(data, null, 2)

        const existingScript: Element | null = document.querySelector(
            'script[type="application/ld+json"]'
        )
        if (existingScript) {
            existingScript.remove()
        }

        document.head.appendChild(script)

        return data
    } catch {
        return null
    }
}
