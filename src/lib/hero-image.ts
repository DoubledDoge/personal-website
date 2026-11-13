import avif405 from "#assets/hero-image-405w.avif";
import jxl405 from "#assets/hero-image-405w.jxl";
import webp405 from "#assets/hero-image-405w.webp";
import avif627 from "#assets/hero-image-627w.avif";
import jxl627 from "#assets/hero-image-627w.jxl";
import webp627 from "#assets/hero-image-627w.webp";

export const HeroImageSet = {
	avif: `${avif405} 405w, ${avif627} 627w`,
	jxl: `${jxl405} 405w, ${jxl627} 627w`,
	webp: `${webp405} 405w, ${webp627} 627w`,
	fallbackSrc: webp627,
	sizes: "(min-width: 1024px) 405px, min(450px, 88vw)",
	width: 627,
	height: 941,
} as const;
