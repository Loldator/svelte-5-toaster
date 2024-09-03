<script>
	import ExampleToast from '$lib/example-toast.svelte';
	import { toaster } from '$lib/toaster.svelte.js';
</script>

<section id="button-section">
	<button class="btn" onclick={() => toaster.add(ExampleToast, { timeout: performance.now() + 5000, modal: true })}>TOAST</button>
	<button class="btn" onclick={() => toaster.clear()}>CLEAR </button>
</section>

<style>
	#button-section {
		padding-top: 0.25rem;
		display: flex;
		width: 100%;
		justify-content: center;
		gap: 10px;
	}

	.btn {
		pointer-events: auto;
		padding: 0.5rem;
		border-radius: 0.25rem;
		background-color: #64748b;
	}
	.btn:hover {
		opacity: 0.9;
	}
	.btn:active {
		opacity: 1;
	}
</style>
