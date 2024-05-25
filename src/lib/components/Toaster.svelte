<script>
	/**
	 * @typedef Props
	 * @property {Function} onold
	 */

	/** @type {Props} */
	const { onold } = $props();

	import { toaster } from '$lib/utils/toaster.svelte.js';
	import Toast from './Toast.svelte';
</script>

<div id="toaster">
	{#each toaster.arr as data, idx}
		<Toast {onold} {idx} id={data.id} {data}>
			{@render data.snippet(idx, data)}
		</Toast>
	{/each}
</div>

<style>
	#toaster {
		padding: 0;
		margin: 0;
		position: absolute;
		pointer-events: none;
		left: 0;
		right: 0;
		bottom: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100dvw;
		max-width: 100dvw;
		max-height: 100dvh;
		margin-bottom: 1rem;
	}
</style>
