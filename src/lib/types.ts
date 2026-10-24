export interface Contact {
	contactText: string;
	external: boolean;
	header: string;
	id: string;
	link: string;
	type: "email" | "phone" | "social";
}

export interface Project {
	description: string;
	webURL?: string;
	gitURL: string;
	id: string;
	image?: string;
	imageAlt?: string;
	technologies: string[];
	title: string;
}

export interface AboutPage extends PageHeading {
	skills: SkillGroups;
}

export interface PageHeading {
	subtitle: string;
	title: string;
}

export type PageSection =
	| { items: string[]; kind: "list"; title: string }
	| {
			entries: { name: string; value: string }[];
			kind: "object";
			title: string;
	  }
	| { kind: "text"; text: string; title: string };

export interface PageContent extends PageHeading {
	sections: PageSection[];
}

export interface StatusEntry {
	label: string;
	name: string;
	value: boolean | number | string;
}

export interface ContactPage extends PageHeading {
	contacts: Contact[];
	status: StatusEntry[];
}

export interface Skill {
	icon: string;
	id: string;
	name: string;
}

export interface SkillGroups {
	frameworks: Skill[];
	languages: Skill[];
	tools: Skill[];
}

export interface ProjectsPage extends PageHeading {
	projects: Project[];
}

export interface Stat {
	icon: string;
	label: string;
	value: number;
}

export interface ConsoleLine {
	color?: string;
	delay: number;
	text: string;
}
