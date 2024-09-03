<script>
	import '../app.css';
	import { page } from '$app/stores';
	import Toaster from '$lib/Toaster.svelte';
	import { toaster } from '$lib/toaster.svelte';
</script>

<div class="foo">
	<nav id="nav">
		<a id="modal" class:local-link={'/modal' === $page.route.id} href="/modal">Modal</a>
		<a id="nonmodal" class:local-link={'/nonmodal' === $page.route.id} href="/nonmodal">Nonmodal</a>
	</nav>

	<main id="main">
		<slot></slot>
	</main>
</div>

{#if toaster.arr.length > 0}
	<Toaster onold={(/** @type {string} */ id) => toaster.pop(id)} />
{/if}

<style>
	.foo {
		width: 100wh;
		height: 100vh;
		display: flex;
		flex-direction: column;
	}

	#main {
		align-self: stretch;
		flex-grow: 1;
		background: rgb(240, 196, 44);
		background: linear-gradient(228deg, rgba(240, 196, 44, 1) 0%, rgba(176, 100, 249, 1) 100%);
	}

	#nav {
		display: flex;
		gap: 2rem;
		background: gray;
		place-content: center;
		padding-top: 0.25rem;
		padding-bottom: 0.25rem;
	}
	.local-link {
		color: red;
		text-decoration: underline;
	}
</style>
