/// <reference types="vite/client" />
/// <reference types="node" />

declare module '*.svelte' {
    const component: <SvelteComponent>() => SvelteComponent
    export default component
}

interface ImportMetaEnv {
    readonly VITE_EMAILJS_PUBLIC_KEY?: string
    readonly VITE_EMAILJS_TEMPLATE_ID?: string
    readonly VITE_EMAILJS_SERVICE_ID?: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}

declare module '$assets/*' {
    const value: string
    export default value
}

interface TextContent {
    hero: {
        name: string
        tagline: string
    }
}

declare module '$data/text-content.json' {
    const value: TextContent
    export default value
}

interface ServicesData {
    services: {
        id: number
        icon: string
        name: string
        description: string
    }[]
}

declare module '$data/services.json' {
    const value: ServicesData
    export default value
}

interface ContactItem {
    id: string
    header: string
    icon: string
    link: string
    contactText: string
    type: 'email' | 'phone' | 'social'
    external?: boolean
}

interface ContactsData {
    contacts: ContactItem[]
}

declare module '$data/contacts.json' {
    const value: ContactsData
    export default value
}

interface EducationData {
    education: {
        id: number
        School: string
        Degree: string
        Year: string
        description?: string
    }[]
    statistics: {
        id: number
        value: string
        label: string
        description: string
        category: 'academic' | 'projects' | 'skills'
    }[]
}

declare module '$data/education.json' {
    const value: EducationData
    export default value
}

interface ProjectsData {
    categories: string[]
    projects: {
        id: number
        category: string
        image: string
        title: string
        description: string
        technologies: string[]
        gitURL: string | null
        webURL: string | null
    }[]
}

declare module '$data/projects.json' {
    const value: ProjectsData
    export default value
}

interface SkillsData {
    skills: {
        id: number
        name: string
        proficiency: number
        category: 'Frontend' | 'Backend' | 'Database'
    }[]
    experiences: {
        id: number
        role: string
        company: string
        date: string
        description: string
        icon: string
    }[]
}

declare module '$data/skills.json' {
    const value: SkillsData
    export default value
}

declare module '*.svg' {
    import type { SvelteComponent } from 'svelte'
    const content: SvelteComponent
    export default content
}

declare module '*.svg?url' {
    const src: string
    export default src
}

declare module '*.svg?raw' {
    const src: string
    export default src
}

declare module '*.webp' {
    const src: string
    export default src
}
