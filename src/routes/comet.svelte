<script>
	import '$lib/scripts/comet/comet.js';
	import './../styles/comet.css';
</script>

<main>
	<script defer src="https://cdnjs.cloudflare.com/ajax/libs/three.js/104/three.min.js"></script>
	<a class="btn__return" href="/">return </a>
	<div id="menu" />
	<div id="hud">
		<div id="status">message</div>
		<div id="top-left" />
		<div id="top-right">
			<div class="levelHud">Level: 1</div>
			<div class="pointHud">Points: 0</div>
			<div class="speedHud">Speed: 15</div>
		</div>
		<div id="bottom-left" />
		<div id="bottom-right" />
	</div>
</main>
