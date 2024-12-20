/** @import { Snippet } from '#svelte' */

import { SvelteMap } from 'svelte/reactivity';

function createToaster() {
	/**
	 * @typedef Data
	 * @property {string} id
	 * @property {number} time
	 * @property {boolean} open
	 * @property {boolean} isOld
	 * @property {Snippet} snippet
	 */

	/** @type {Map<string, Data>}*/
	const map = $state(new SvelteMap());

	const arr = $derived([...map.values()]);

	const hasOpen = $derived(arr.some((x) => x.open === true));

	/**
	 * @param {Snippet} snippet
	 * @param {any} data
	 */
	function add(snippet, data) {
		const id = crypto.randomUUID();
		const d = $state({ snippet, open: false, isOld: false, id: id, ...data });
		map.set(id, d);
	}

	function clear() {
		map.clear();
	}

	/**
	 * @param {string} id
	 */
	function pop(id) {
		map.delete(id);
	}

	return {
		get toasts() {
			return map;
		},
		get arr() {
			return arr;
		},
		get hasOpen() {
			return hasOpen;
		},
		add,
		pop,
		clear
	};
}

const toaster = createToaster();

export { toaster };
