/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
/// <reference lib="webworker" />

import { version } from "$app/env";
import { assets, immutable } from "$app/manifest";
import { asset } from "$app/paths";
import { self } from "$app/service-worker";
import type { AssetPath } from "$app/types";

const FILES = `cache${version}`;
const OFFLINE = `offline${version}`;

const to_cache: string[] = [
	...immutable.map((file): string => asset(file.path as AssetPath)),
	...assets.map((file): string => asset(file.path)),
];
const staticAssets = new Set(to_cache);

self.addEventListener("install", (event: ExtendableEvent): void => {
	event.waitUntil(
		caches
			.open(FILES)
			.then((cache: Cache): Promise<void> => cache.addAll(to_cache))
			.then((): void => {
				self.skipWaiting().catch((): void => {
					// Intentionally ignored
				});
			}),
	);
});

self.addEventListener("activate", (event: ExtendableEvent): void => {
	event.waitUntil(
		caches.keys().then(async (keys: string[]): Promise<void> => {
			await Promise.all(
				keys
					.filter((key: string): boolean => key !== FILES && key !== OFFLINE)
					.map((key: string): Promise<boolean> => caches.delete(key)),
			);
			await self.clients.claim();
		}),
	);
});

async function fetchAndCache(request: Request): Promise<Response> {
	const cache: Cache = await caches.open(OFFLINE);

	try {
		const response: Response = await fetch(request);
		await cache.put(request, response.clone());
		return response;
	} catch (err) {
		const response: Response | undefined = await cache.match(request);
		if (response) {
			return response;
		}

		throw err;
	}
}

function isStaticAsset(url: URL): boolean {
	return url.host === self.location.host && staticAssets.has(url.pathname);
}

function isCacheableRequest(request: Request): boolean {
	return request.method === "GET" && !request.headers.has("range");
}

function isDevServerRequest(url: URL): boolean {
	return (
		url.hostname === self.location.hostname && url.port !== self.location.port
	);
}

function isNetworkUrl(url: URL): boolean {
	return url.protocol.startsWith("http") && !isDevServerRequest(url);
}

function shouldHandle(request: Request): boolean {
	const url = new URL(request.url);

	return (
		isCacheableRequest(request) &&
		isNetworkUrl(url) &&
		(request.cache !== "only-if-cached" || isStaticAsset(url))
	);
}

async function respond(request: Request): Promise<Response> {
	if (isStaticAsset(new URL(request.url))) {
		const cachedAsset: Response | undefined = await caches.match(request);
		if (cachedAsset) {
			return cachedAsset;
		}
	}

	return fetchAndCache(request);
}

self.addEventListener("fetch", (event: FetchEvent): void => {
	if (shouldHandle(event.request)) {
		event.respondWith(respond(event.request));
	}
});
