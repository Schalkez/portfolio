<script lang="ts">
    import { onMount } from "svelte";

    export let repo = "Schalkez/portfolio";
    export let repoId = "R_kgDOPDQG5w";
    export let category = "Announcements";
    export let categoryId = "DIC_kwDOPDQG584Cy2ko";
    export let mapping = "pathname";
    export let term = "Welcome to @giscus/svelte component!";
    export let strict = "0";
    export let reactionsEnabled = "1";
    export let emitMetadata = "0";
    export let inputPosition = "bottom";
    export let theme = "preferred_color_scheme";
    export let lang = "vi";
    export let loading = "lazy";

    onMount(() => {
        const script = document.createElement("script");
        script.src = "https://giscus.app/client.js";
        script.setAttribute("data-repo", repo);
        script.setAttribute("data-repo-id", repoId);
        script.setAttribute("data-category", category);
        script.setAttribute("data-category-id", categoryId);
        script.setAttribute("data-mapping", mapping);
        script.setAttribute("data-strict", strict);
        script.setAttribute("data-reactions-enabled", reactionsEnabled);
        script.setAttribute("data-emit-metadata", emitMetadata);
        script.setAttribute("data-input-position", inputPosition);
        script.setAttribute("data-theme", theme);
        script.setAttribute("data-lang", lang);
        script.setAttribute("data-loading", loading);
        script.crossOrigin = "anonymous";
        script.async = true;

        const container = document.getElementById("giscus-container");
        if (container) {
            container.appendChild(script);
        }
    });
</script>

<div id="giscus-container" class="giscus mt-10"></div>
