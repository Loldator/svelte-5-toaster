<script>
	import { toaster } from '$lib/utils/toaster.svelte';

	/**
	 * @typedef Data
	 * @property {number} timeout
	 * @property {boolean} open
	 * @property {boolean} isOld
	 * @property {boolean} hidden
	 */

	/**
	 * @typedef Props
	 * @property {number} idx
	 * @property {string} id
	 * @property {Data} data
	 * @property {import('svelte').Snippet} children
	 * @property {Function} onold
	 */

	/** @type {Props}*/
	const { idx, id = crypto.randomUUID(), data, children, onold } = $props();

	/** @param {string} id*/
	function checkIfOld(id) {
		if (data?.open === true) {
			return;
		}
		data.isOld = performance.now() > data.timeout;
		if (data.isOld) {
			data.hidden = true;
			if (!toaster.hasOpen) {
				onold(id);
				clearInterval(intId);
			}
		}
	}

	const intId = setInterval(checkIfOld, 500, id);
</script>

<div class:hiddenx={data.hidden}>
	{@render children(idx, data)}
</div>

<style>
	.hiddenx {
		visibility: hidden;
	}
</style>
