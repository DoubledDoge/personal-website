import type {
	AboutPage,
	ConsoleLine,
	Contact,
	ContactPage,
	PageContent,
	Project,
	ProjectsPage,
	Stat,
} from "../types.ts";
import about from "./about.json";
import colophon from "./colophon.json";
import contactPage from "./contact.json";
import home from "./home.json";
import now from "./now.json";
import projectsPage from "./projects.json";
import uses from "./uses.json";

// JSON imports widen string unions to string, so contacts need a cast.
export const AboutPageData: AboutPage = about as AboutPage;
export const ColophonData: PageContent = colophon as PageContent;
export const ContactData: readonly Contact[] = (contactPage as ContactPage)
	.contacts as readonly Contact[];
export const ContactPageData: ContactPage = contactPage as ContactPage;
export const ConsoleData: readonly ConsoleLine[] =
	home.console as readonly ConsoleLine[];
export const NowData: PageContent = now as PageContent;
export const ProjectData: readonly Project[] = (projectsPage as ProjectsPage)
	.projects as readonly Project[];
export const ProjectsPageData: ProjectsPage = projectsPage as ProjectsPage;
export const StatData: readonly Stat[] = home.stats as readonly Stat[];
export const UsesData: PageContent = uses as PageContent;
