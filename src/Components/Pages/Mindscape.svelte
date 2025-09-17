<script lang="ts">
	import { get } from "svelte/store";
	import { ElementTypes } from "../../Game/Content/Elements.ts";
	import { Player } from "../../Game/Player.svelte";

	function onFinished(element: ElementTypes) {
		Player.Elements[element].Level++;
	}
</script>

<div class="absolute min-w-full min-h-full p-5">
	<div>
		<h1 class="text-lg mb-5 text-center">Elements</h1>
		<div class="grid grid-cols-2 gap-5"></div>
	</div>
</div>
