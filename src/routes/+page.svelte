<script>
	import { toaster } from '$lib/utils/toaster.svelte.js';

	function show(ev, data) {
		data.isModal ? ev.showModal() : ev.show();
		data.open = true;
	}
</script>

{#snippet foo(id, data)}
	<div
		class="before:content-['🚀'] before:rotate-[270deg] before:absolute before:-top-2 before:-left-6 after:absolute after:content-['🚀'] after:-top-2 after:-right-6
		relative flex bg-gray-300 ring-2 rounded-xl p-1 my-1.5 pointer-events-auto rounded"
		class:ring-green-300={data.modal}
	>
		<label class="" for="dialog">
			<button onclick={(ev) => show(ev.target.parentNode.nextElementSibling, data)}>{id}</button>
		</label>

		<dialog id="dialog" onclose={() => (data.open = !data.open)}>
			<div class="flex flex-col space-y-2 p-2">
				<form method="dialog">
					<p>{id}</p>
					<button method="dialog" class="ring-1 bg-blue-300 hover:bg-blue-300/75 active:bg-blue-300"
						>Close</button
					>
				</form>
			</div>
		</dialog>
	</div>

	<style>
		div {
			opacity: 1;
			transition-property: opacity;
			transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
			transition-duration: 350ms;
		}
		/*   Open state of the dialog  */
		dialog[open] {
			opacity: 1;
			transform: scaleY(1);
		}

		/*   Closed state of the dialog   */
		dialog {
			opacity: 0;
			transform: scaleY(0);
			transition:
				opacity 0.7s ease-out,
				transform 0.7s ease-out,
				overlay 0.7s ease-out allow-discrete,
				display 0.7s ease-out allow-discrete;
			/* Equivalent to
  transition: all 0.7s allow-discrete; */
		}

		/*   Before-open state  */
		/* Needs to be after the previous dialog[open] rule to take effect,
    as the specificity is the same */
		@starting-style {
			dialog[open] {
				opacity: 0;
				transform: scaleY(0);
			}
		}

		/* Transition the :backdrop when the dialog modal is promoted to the top layer */
		dialog::backdrop {
			background-color: rgb(0 0 0 / 0%);
			transition:
				display 0.7s allow-discrete,
				overlay 0.7s allow-discrete,
				background-color 0.7s;
			/* Equivalent to
  transition: all 0.7s allow-discrete; */
		}

		dialog[open]::backdrop {
			background-color: rgb(0 0 0 / 25%);
		}

		/* This starting-style rule cannot be nested inside the above selector
because the nesting selector cannot represent pseudo-elements. */

		@starting-style {
			div {
				opacity: 0;
			}

			dialog[open]::backdrop {
				background-color: rgb(0 0 0 / 0%);
			}
		}
	</style>
{/snippet}

<div class="h-screen w-screen flex flex-col justify-center items-center">
	<div>
		<button onclick={() => toaster.add(foo, { time: 2500 })} class="px-2 py-2 rounded bg-slate-500"
			>TOAST</button
		>

		<button onclick={() => toaster.clear()} class="px-2 py-2 rounded bg-slate-500">CLEAR</button>
	</div>
</div>
