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
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		pointer-events: none;
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		max-height: 100%;
		margin-bottom: 1rem;
	}
</style>
