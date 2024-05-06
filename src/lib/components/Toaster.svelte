<script>
	import { toaster } from '$lib/utils/toaster.svelte.js';
	import Toast from './Toast.svelte';
</script>

<div
	class="absolute bottom-0 inset-x-0 pointer-events-none flex flex-col items-center w-screen max-h-screen mb-4"
>
	{#each toaster.toasts.entries() as [id, data]}
		<Toast onold={(id) => toaster.drop(id)} {id} {data}>
			{@render data.snippet(id, data)}
		</Toast>
	{/each}
</div>
