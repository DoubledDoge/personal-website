import adapter from "@sveltejs/adapter-static";
import { sveltekit } from "@sveltejs/kit/vite";
import browserslist from "browserslist";
import { browserslistToTargets } from "lightningcss";
import unicons from "unplugin-icons/vite";
import { defineConfig } from "vite";

const base = process.env.BASE_PATH ?? "";

if (base !== "" && !base.startsWith("/")) {
	throw new Error(`BASE_PATH must be empty or start with "/", got: "${base}"`);
}

export default defineConfig({
	define: {
		__BUILD_DATE__: JSON.stringify(new Date().toISOString()),
	},

	build: {
		cssMinify: "lightningcss",
		minify: "oxc",
		reportCompressedSize: false,
		target: "esnext",
	},

	css: {
		lightningcss: {
			targets: browserslistToTargets(browserslist("defaults")),
		},
		transformer: "lightningcss",
	},
	plugins: [
		sveltekit({
			compilerOptions: {
				runes: true,
			},

			adapter: adapter({
				assets: "build",
				pages: "build",
				precompress: true,
				strict: true,
			}),

			paths: {
				base: base as "" | `/${string}`,
			},

			prerender: {
				entries: ["*"],
			},
		}),
		unicons({
			autoInstall: true,
			compiler: "svelte",
		}),
	],
	server: {
		open: true,
		port: 5173,
		strictPort: false,
	},
});
