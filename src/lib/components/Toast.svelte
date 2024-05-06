<script>
	const {
		/** @type {number} */
		id = crypto.randomUUID(),
		/**
		 * @type {object}
		 * @property {number} time
		 */
		data,
		children,
		onold
	} = $props();

	const timeout = performance.now() + data.time;

	function checkIfOld(id) {
		data.isOld = performance.now() > timeout;
		if (data.open === false && data.isOld) {
			onold(id);
			clearInterval(intId);
		}
	}

	const intId = setInterval(checkIfOld, 500, id);
</script>

{@render children(id, data)}
