<script lang="ts">
import type { Component } from "svelte";
import {
	AboutPageData,
	Button,
	CodeWindow,
	PageHeader,
	Resume,
	SkillBadge,
} from "#lib";
import Boxes from "~icons/lucide/boxes";
import Code from "~icons/lucide/code";
import Coffee from "~icons/lucide/coffee";
import Computer from "~icons/lucide/computer";
import Cpu from "~icons/lucide/cpu";
import Database from "~icons/lucide/database";
import DatabaseZap from "~icons/lucide/database-zap";
import Download from "~icons/lucide/download";
import FileCode from "~icons/lucide/file-code";
import GitBranch from "~icons/lucide/git-branch";
import GlobeCode from "~icons/lucide/globe-code";
import LayoutTemplate from "~icons/lucide/layout-template";
import Leaf from "~icons/lucide/leaf";
import Palette from "~icons/lucide/palette";
import PanelsTopLeft from "~icons/lucide/panels-top-left";
import Server from "~icons/lucide/server";
import Smartphone from "~icons/lucide/smartphone";
import SmartphoneUserRound from "~icons/lucide/smartphone-user-round";
import SquareChevronRight from "~icons/lucide/square-chevron-right";
import Terminal from "~icons/lucide/terminal";

const iconMap: Record<string, Component> = {
	boxes: Boxes,
	coffee: Coffee,
	cpu: Cpu,
	database: Database,
	"file-code": FileCode,
	"git-branch": GitBranch,
	"layout-template": LayoutTemplate,
	"smartphone-user-round": SmartphoneUserRound,
	"square-chevron-right": SquareChevronRight,
	computer: Computer,
	code: Code,
	server: Server,
	"globe-code": GlobeCode,
	"panels-top-left": PanelsTopLeft,
	"database-zap": DatabaseZap,
	leaf: Leaf,
	palette: Palette,
	smartphone: Smartphone,
	terminal: Terminal,
};

const skillGroups = [
	{
		id: "languages",
		label: "Languages",
		skills: AboutPageData.skills.languages,
	},
	{
		id: "frameworks",
		label: "Frameworks",
		skills: AboutPageData.skills.frameworks,
	},
	{ id: "tools", label: "Tools", skills: AboutPageData.skills.tools },
];
</script>

<section class="page-grid">
	<PageHeader {...AboutPageData} />

	<div class="reveal" style="--reveal-delay: 0.06s">
		<CodeWindow filename="AboutMe.cs" namespace="Profile">
			<p class="boilerplate" aria-hidden="true">
				<span class="kw">public class</span> <span class="ty">AboutMe</span>
				<span>&#123;</span>
			</p>

			<div class="indent">
				<div aria-hidden="true">
					<p>
						<span class="kw">public</span> <span class="ty">Education</span>
						<span class="fn">GetCurrentEducation</span>() =&gt;
						<span class="kw">new</span>()
					</p>

					<p>&#123;</p>

					<div class="indent">
						<p>
							<span class="var">Institution</span>
							= <span class="str">"Eduvos"</span>,
						</p>
						<p>
							<span class="var">Degree</span>
							= <span class="str">"BSc Information Technology"</span>,
						</p>
						<p>
							<span class="var">Year</span>
							= <span class="str">"2024 - Present"</span>
						</p>
					</div>

					<p>&#125;;</p>
				</div>

				<p class="sr-only">
					Education: BSc Information Technology at Eduvos, 2024 to present.
				</p>

				<p class="biography-declaration" aria-hidden="true">
					<span class="kw">public string</span>
					<span class="fn">Biography</span>
					=&gt; <span class="str">"""</span>
				</p>

				<div class="prose">
					<p>
						I'm Dihan Britz, a third year Bachelor of Information Technology
						student at Eduvos, specializing in software engineering. I focus
						primarily on C# for desktop applications and Java/Kotlin for Android
						development, with a growing interest in database design and web
						technologies.
					</p>

					<p>
						My programming journey started with C++, but I've since gravitated
						toward C# as my primary language (while fully moving away from C++).
						I enjoy building practical tools, from console utilities that
						simplify repetitive tasks to mobile apps that solve real problems. I
						like to be iterating on my work, refining both my technical skills
						and my approach to software design.
					</p>

					<p>
						Outside of code, I spend time hiking, gaming, and camping. I value
						honest feedback and continuous improvement greatly as I'd rather
						know what's broken than just pretend it works. As such, I tend to be
						obsessed with following best practices to my code.
					</p>
				</div>

				<p aria-hidden="true"><span class="str">"""</span>;</p>
			</div>

			<p class="boilerplate" aria-hidden="true">&#125;</p>
		</CodeWindow>
	</div>

	<aside class="sidebar">
		<div class="panel">
			<h2>Dependencies (Skills)</h2>
			{#each skillGroups as group, i (group.id)}
				<div
					class="skill-group reveal"
					style="--reveal-delay: {(i + 2) * 0.06}s"
				>
					<h3>{group.label}</h3>

					<ul class="skills-grid">
						{#each group.skills as skill (skill.id)}
							<li>
								<SkillBadge icon={iconMap[skill.icon]} name={skill.name} />
							</li>
						{/each}
					</ul>
				</div>
			{/each}
		</div>

		<div class="panel action-panel reveal" style="--reveal-delay: 0.3s">
			<Button class="full-width" href={Resume} icon={Download} variant="solid">
				Download Resume
			</Button>
		</div>
	</aside>
</section>

<style>
.indent {
	padding-left: clamp(1rem, 3vw, 2rem);
}

.biography-declaration {
	margin-top: 1.6rem;
}

.prose {
	border-left: 2px solid
		color-mix(in oklch, var(--string-color) 40%, transparent);
	padding-left: 1.5rem;
	margin: 1rem 0 1rem clamp(0rem, 2vw, 1rem);
	font-family: var(--font-family), system-ui;
	color: var(--text-colour);
	line-height: 1.8;
	max-width: 65ch;

	p {
		margin-bottom: 1.25rem;
		text-wrap: pretty;

		&:last-child {
			margin-bottom: 0;
		}
	}
}

.sidebar {
	display: flex;
	flex-direction: column;
	gap: 2rem;
}

.panel {
	display: flex;
	flex-direction: column;
	gap: 1.5rem;
}

h2 {
	font-size: 1.25rem;
	font-family: var(--font-mono), monospace;
	color: var(--text-colour);
	border-bottom: 2px solid var(--primary-accent);
	padding-bottom: 0.5rem;
	width: max-content;
	max-width: 100%;
}

.skill-group {
	display: flex;
	flex-direction: column;
	gap: 0.75rem;
}

h3 {
	font-family: var(--font-mono), monospace;
	font-size: 0.95rem;
	font-weight: 600;
	color: var(--text-muted);

	&::before {
		content: "// " / "";
	}
}

.skills-grid {
	display: flex;
	flex-wrap: wrap;
	gap: 0.75rem;
	list-style: none;
	padding: 0;
}

.action-panel {
	margin-top: 1rem;

	:global(.full-width) {
		width: 100%;
	}
}
</style>
