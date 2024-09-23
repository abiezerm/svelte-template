<script lang="ts">
    import { locale } from "svelte-i18n";
</script>

<button type="button" data-testid="btn-es-lang" class="btn" onclick={() => locale.set("es")} >
    <img src="https://flagsapi.com/ES/flat/24.png" alt="spanish">
</button>
<button type="button" data-testid="btn-en-lang"  class="btn" onclick={() => locale.set("en")} >
    <img src="https://flagsapi.com/US/flat/24.png" alt="english">
</button>