<script lang="ts">
    import { activate } from "../api/apiCalls.svelte";
  import Spinner from "../lib/components/Spinner.svelte";

    export const token: string = "";

    let apiCall =  activate(token);
</script>

<div data-testid="activation-page">
    {#await apiCall}
        <Spinner size="lg" />
    {:then}
        <div class="alert alert-success">Account activated successfully</div>
    {:catch}
        <div class="alert alert-danger">Activation failure</div>
    {/await}

</div>