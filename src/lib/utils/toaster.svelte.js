import { Map } from 'svelte/reactivity';

function createToaster() {
	/**
	 * @typedef Data
	 * @property {string} id
	 * @property {number} time
	 * @property {boolean} open
	 * @property {boolean} isOld
	 * @property {import('svelte').Snippet} snippet
	 */

	/** @type {Map<string, Data>}*/
	const map = new Map();

	const arr = $derived([...map.values()]);

	/**
	 * @param {import('svelte').Snippet} snippet
	 * @param {any} data
	 */
	function add(snippet, data) {
		const id = crypto.randomUUID();
		const d = $state({ snippet, open: false, isOld: false, modal: true, id: id, ...data });
		map.set(id, d);
	}

	function clear() {
		map.clear();
	}

	/**
	 * @param {string} id
	 */
	function pop(id) {
		// if (map.get(id)?.open) {
		// 	return;
		// }
		// map.delete(id);
	}

	return {
		get toasts() {
			return map;
		},
		get arr() {
			return arr;
		},
		add,
		pop,
		clear
	};
}

const toaster = createToaster();

export { toaster };
