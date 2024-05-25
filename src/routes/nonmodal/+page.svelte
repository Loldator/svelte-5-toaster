<script>
	import { toaster } from '$lib/utils/toaster.svelte.js';

	/**
	 * @param {{ modal: any; open: boolean; dialog : ?HTMLDialogElement; }} data
	 */
	function show(data) {
		data.modal ? data?.dialog?.showModal() : data?.dialog?.show();
		data.open = true;
	}

	/**
	 * @param {?HTMLDialogElement} node
	 * @param {{ modal: any; open: boolean; dialog : ?HTMLDialogElement; }} data
	 */
	function addRef(node, data) {
		data.dialog = node;
	}
</script>

{#snippet exampleToast(idx, data)}
	<div id={data.id}>
		<dialog use:addRef={data} id={data.id} onclose={() => (data.open = false)}>
			<form method="dialog">
				<div class:toast={!data.modal}>
					<pre>{JSON.stringify(data, null, 2)}</pre>
					<button type="submit" class="btn">Close</button>
				</div>
			</form>
		</dialog>

		{#if !data.open}
			<div class="toast">
				<label for="dialog">
					<button type="button" onclick={() => show(data)}>{`${idx} ► ${data.id}`}</button>
				</label>
			</div>
		{/if}
	</div>

	<style>
		/*   Open state of the dialog  */
		:modal {
			opacity: 1;
			padding: 0.5rem;
			border-radius: 0.25rem;
			transform: scaleY(1);
			transition-property: opacity;
			transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
			transition-duration: 350ms;
		}

		dialog[open] {
			opacity: 1;
			transform: scaleY(1);
			max-width: 100dvw;
			max-height: 100dvh;
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
			/* Equivalent to transition: all 0.7s allow-discrete; */
		}

		/*   Before-open state  */
		/* Needs to be after the previous dialog[open] rule to take effect, as the specificity is the same */
		@starting-style {
			:modal {
				opacity: 0;
				transform: scaleY(0);
			}
		}

		/* Transition the :backdrop when the dialog modal is promoted to the top layer */
		:modal::backdrop {
			background-color: rgb(0 0 0 / 0%);
			transition:
				display 0.7s allow-discrete,
				overlay 0.7s allow-discrete,
				background-color 0.7s;
			/* Equivalent to transition: all 0.7s allow-discrete; */
		}

		dialog[open]::backdrop {
			background-color: rgb(0 0 0 / 25%);
		}

		/* This starting-style rule cannot be nested inside the above selector because the nesting selector cannot represent pseudo-elements. */
		@starting-style {
			div {
				opacity: 0;
			}

			dialog[open]::backdrop {
				background-color: rgb(0 0 0 / 0%);
			}
		}

		.toast::before {
			content: '🚀';
			transform: rotate(270deg);
			position: absolute;
			top: -0.5rem;
			left: -1.25rem;
		}
		.toast::after {
			content: '🚀';
			position: absolute;
			top: -0.5rem;
			right: -1.25rem;
		}

		.toast {
			opacity: 1;
			flex-grow: 1;
			flex: 1 1 0%;
			transition-property: opacity;
			transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
			transition-duration: 350ms;
			box-shadow: 0px 0 0 0 2px rgb(59 130 246 / 0.5);
			pointer-events: auto;
			background-color: rgb(209 213 219);
			padding: 0.25rem;
			position: relative;
			margin-top: 0.375rem;
			margin-bottom: 0.375rem;
			border-radius: 0.75rem;
		}
	</style>
{/snippet}

<section id="button-section">
	<button onclick={() => toaster.add(exampleToast, { timeout: performance.now() + 5000, modal: false })} class="btn">TOAST</button>
	<button onclick={() => toaster.clear()} class="btn">CLEAR </button>
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
