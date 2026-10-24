<div aria-hidden="true" class="backdrop">
	<div class="dot-grid"></div>
	<div class="bokeh bokeh-one"></div>
	<div class="bokeh bokeh-two"></div>
	<div class="bokeh bokeh-three"></div>
	<div class="bokeh bokeh-four"></div>
</div>

<style>
.backdrop {
	inset: 0;
	overflow: hidden;
	pointer-events: none;
	position: fixed;
	view-transition-name: --site-backdrop;
	z-index: var(--z-back);
}

.dot-grid {
	background-image: radial-gradient(var(--border-colour) 1px, transparent 1px);
	background-size: 24px 24px;
	inset: 0;
	mask-image: radial-gradient(
		ellipse 70% 55% at 50% 35%,
		black 30%,
		transparent 90%
	);
	opacity: 0.4;
	position: absolute;
}

.bokeh {
	border-radius: 50%;
	filter: blur(48px);
	height: min(42vw, 32rem);
	position: absolute;
	width: min(42vw, 32rem);
	will-change: transform;
}

.bokeh-one {
	animation: drift 34s ease-in-out infinite alternate;
	background: radial-gradient(
		circle,
		var(--primary-accent) 0%,
		transparent 70%
	);
	left: -12%;
	opacity: 0.12;
	top: 5%;
}

.bokeh-two {
	animation: drift 38s ease-in-out -12s infinite alternate;
	background: radial-gradient(
		circle,
		var(--secondary-accent) 0%,
		transparent 70%
	);
	opacity: 0.22;
	right: -10%;
	top: 24%;
}

.bokeh-three {
	animation: drift 30s ease-in-out -7s infinite alternate;
	background: radial-gradient(
		circle,
		var(--secondary-accent) 0%,
		transparent 70%
	);
	bottom: -18%;
	left: 26%;
	opacity: 0.18;
}

.bokeh-four {
	animation: drift 40s ease-in-out -20s infinite alternate;
	background: radial-gradient(
		circle,
		var(--primary-accent) 0%,
		transparent 70%
	);
	bottom: 8%;
	opacity: 0.1;
	right: 8%;
}

@media (prefers-reduced-motion: reduce) {
	.bokeh {
		animation: none;
		will-change: auto;
	}
}
</style>
