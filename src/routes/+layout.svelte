<script>
	import '../app.css';
	import Toaster from '$lib/components/Toaster.svelte';
</script>

<div class="h-screen w-screen relative bg-gradient-to-t from-indigo-300 to-blue-500">
	<slot />
	<Toaster />
</div>
