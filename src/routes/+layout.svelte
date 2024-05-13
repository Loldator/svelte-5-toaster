<script>
	import '../app.css';
	import Toaster from '$lib/components/Toaster.svelte';
	import { toaster } from '$lib/utils/toaster.svelte.js';
	import { page } from '$app/stores';

	/**
	 * @param {?HTMLDialogElement} dialog
	 * @param {{ modal: any; open: boolean; }} data
	 */
	function show(dialog, data) {
		data.modal ? dialog?.showModal() : dialog?.show();
	}
</script>

{#snippet exampleToast(idx, data)}
	<div id={data.id} class="toast">
		<label for="dialog">
			<button
				type="button"
				onclick={(e) => {
					const dialog = e.target.parentElement.nextElementSibling;
					show(dialog, data);
					data.open = true;
				}}>{`${idx} ► ${data.id}`}</button
			>
		</label>
		<dialog
			id={data.id}
			onclose={(e) => {
				data.open = false;
				e.currentTarget.close();
			}}
		>
			<form method="dialog">
				<pre>{JSON.stringify(data, null, 2)}</pre>
				<button type="submit" class="btn">Close</button>
			</form>
		</dialog>
	</div>

	<style>
		.toast {
			opacity: 1;
			transition-property: opacity;
			transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
			transition-duration: 350ms;
		}
		:modal {
			opacity: 1;
			transition-property: opacity;
			transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
			transition-duration: 350ms;
		}
		/*   Open state of the dialog  */
		:modal {
			opacity: 1;
			padding: 0.5rem;
			border-radius: 0.25rem;
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
		dialog::backdrop {
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
			box-shadow: 0px 0 0 0 2px rgb(59 130 246 / 0.5);
			pointer-events: auto;
			display: block;
			background-color: rgb(209 213 219);
			padding: 0.25rem;
			position: relative;
			margin-top: 0.375rem;
			margin-bottom: 0.375rem;
			border-radius: 0.75rem;
		}
	</style>
{/snippet}

<div class="h-screen flex flex-col">
	<nav id="nav">
		<a id="a" class:local-link={'/a' === $page.route.id} href="/a">A</a>
		<a id="b" class:local-link={'/b' === $page.route.id} href="/b">B</a>
	</nav>

	<div class="split">
		<main id="main">
			<slot />
		</main>

		<section id="buttons">
			<button onclick={() => toaster.add(exampleToast, { timeout: performance.now() + 3500 })} class="btn">TOAST</button>
			<button onclick={() => toaster.clear()} class="btn">CLEAR </button>
		</section>
	</div>
</div>

{#if toaster.arr.length > 0}
	<Toaster onold={(/** @type {string} */ id) => toaster.pop(id)} />
{/if}

<style>
	#main {
		width: 100%;
	}
	.split {
		display: flex;
		flex-grow: true;
		align-items: stretch;
		height: 100%;
		background: rgb(240, 196, 44);
		background: linear-gradient(228deg, rgba(240, 196, 44, 1) 0%, rgba(176, 100, 249, 1) 100%);
	}

	#nav {
		display: flex;
		gap: 2rem;
		background: gray;
		place-content: center;
		padding-top: 0.25rem;
		padding-bottom: 0.25rem;
	}
	.local-link {
		color: red;
		text-decoration: underline;
	}

	#buttons {
		flex-basis: 1/3;
		display: flex;
		margin-right: 0.25rem;
		justify-content: center;
		align-items: center;
		gap: 10px;
	}

	.btn {
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
