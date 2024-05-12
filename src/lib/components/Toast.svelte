<script>
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
			clearInterval(intId);
		}
	}

	const intId = setInterval(checkIfOld, 500, id);

	/**
	 * @type {?HTMLDivElement}
	 */
	let d = $state.frozen(null);
	// $effect(() => {
	// 	if (d && data?.open) {
	// 		data.modal ? d?.firstChild?.firstChild?.showModal() : d?.firstChild?.firstChild?.show();
	// 	}
	// });
</script>

<div class:hiddenx={data.hidden}>
	{@render children(idx, data)}
</div>

<style>
	.hiddenx {
		visibility: hidden;
	}
</style>
