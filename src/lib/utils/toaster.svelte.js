import { Map } from "svelte/reactivity";

function createToaster() {
	const map = new Map();

	function add(snippet, data) {
		const v = $state({ snippet, open: false, modal: Math.random() < 0.5, ...data });
		map.set(crypto.randomUUID(), v);
	}

	function clear() {
		map.clear();
	}

	return {
		get toasts() {
			return map;
		},
		drop(id) {
			map.delete(id);
		},
		add,
		clear,
	};
}

const toaster = createToaster();

export { toaster };
