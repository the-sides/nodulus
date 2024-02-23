<script>
    import { Canvas } from "@threlte/core";
    import { onMount } from "svelte";
    $: width = 0;
    $: height = 0;
    onMount(() => {
        width = window.innerWidth;
        height = window.innerHeight;
    });
</script>

<Canvas size={{ width, height }}>
    <slot/>
</Canvas>