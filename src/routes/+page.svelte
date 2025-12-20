<script lang="ts">
	import Home from '$lib/components/sections/Home.svelte';
	import About from '$lib/components/sections/About.svelte';
	import Skills from '$lib/components/sections/Skills.svelte';
	import Experience from '$lib/components/sections/Experience.svelte';
	import Projects from '$lib/components/sections/Projects.svelte';
	import Achievements from '$lib/components/sections/Achievements.svelte';
	import Contact from '$lib/components/sections/Contact.svelte';
	import Footer from '$lib/components/ui/Footer.svelte';
	import ScrollReveal from '$lib/components/common/ScrollReveal.svelte';
</script>

<div class="p-4">
	<Home />

	<ScrollReveal direction="up" delay={100}>
		<About />
	</ScrollReveal>

	<ScrollReveal direction="up" delay={100}>
		<Skills />
	</ScrollReveal>

	<ScrollReveal direction="up" delay={100}>
		<Experience />
	</ScrollReveal>

	<ScrollReveal direction="up" delay={100}>
		<Projects />
	</ScrollReveal>

	<ScrollReveal direction="up" delay={100}>
		<Achievements />
	</ScrollReveal>

	<ScrollReveal direction="up" delay={100}>
		<Contact />
	</ScrollReveal>
</div>

<Footer />
