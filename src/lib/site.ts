import { ContactData } from "#data/index.ts";

export const site = {
	description:
		"IT student at Eduvos specialising in software engineering. I build C# desktop apps and Java mobile apps, and I'm expanding into database design and web development.",
	longDescription:
		"Bachelor of Information Technology student at Eduvos, specialising in software engineering. I build desktop applications in C#, mobile apps in Java, and enjoy solving problems through clean, maintainable code. Currently expanding my skills in database design and web development.",
	name: "Dihan Britz",
	previewImage: "/preview.jpg",
	themeColour: { dark: "#111111", light: "#f9fafb" },
	url: "https://doubleddoge.github.io/personal-website",
} as const;

export const absoluteUrl = (path: string): string =>
	`${site.url}${path === "/" ? "/" : path}`;

export const personSchema = {
	"@context": "https://schema.org",
	"@type": "Person",
	affiliation: {
		"@type": "CollegeOrUniversity",
		name: "Eduvos",
	},
	description: site.longDescription,
	image: absoluteUrl(site.previewImage),
	jobTitle: "Software Engineering Student",
	knowsAbout: [
		"C#",
		".NET",
		"Java",
		"Android",
		"SQL",
		"Database Design",
		"Web Development",
		"Svelte",
	],
	name: site.name,
	sameAs: ContactData.filter((contact) => contact.type === "social").map(
		(contact) => contact.link,
	),
	url: absoluteUrl("/"),
};
