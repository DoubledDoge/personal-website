import * as fs from "node:fs";
import * as path from "node:path";
import { site } from "#lib/site.ts";

export const prerender = true;

export async function GET(): Promise<Response> {
	const pages: string[] = getRoutes();

	const sitemap: string = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
	.map(
		(page: string): string => `  <url>
    <loc>${site.url}${page}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`,
	)
	.join("\n")}
</urlset>`.trim();

	return new Response(sitemap, {
		headers: {
			"Cache-Control": "max-age=0, s-maxage=3600",
			"Content-Type": "application/xml",
		},
	});
}

function shouldSkipDirectory(file: string): boolean {
	return (
		file.startsWith("[") ||
		file === "api" ||
		file === "sitemap.xml" ||
		file === "robots.txt"
	);
}

function calculateUrlPath(file: string, urlPath: string): string {
	const isGroup: boolean = file.startsWith("(");
	return isGroup ? urlPath : `${urlPath}/${file}`;
}

function hasPageFile(fullPath: string): boolean {
	return (
		fs.existsSync(path.join(fullPath, "+page.svelte")) ||
		fs.existsSync(path.join(fullPath, "+page.ts"))
	);
}

function getRoutes(): string[] {
	const routesPath: string = path.join(process.cwd(), "src/routes");
	const routes: string[] = [];

	function processDirectory(
		file: string,
		dir: string,
		urlPath: string,
		routes: string[],
	): void {
		const fullPath: string = path.join(dir, file);
		const stat = fs.statSync(fullPath);

		if (!stat.isDirectory()) {
			return;
		}

		const nextUrlPath: string = calculateUrlPath(file, urlPath);

		if (hasPageFile(fullPath)) {
			routes.push(nextUrlPath === "" ? "/" : nextUrlPath);
		}

		traverseDirectory(fullPath, nextUrlPath);
	}

	function traverseDirectory(dir: string, urlPath = ""): void {
		const files: string[] = fs.readdirSync(dir);

		for (const file of files) {
			if (!shouldSkipDirectory(file)) {
				processDirectory(file, dir, urlPath, routes);
			}
		}
	}

	routes.push("/");
	traverseDirectory(routesPath);
	return [...new Set(routes)];
}
