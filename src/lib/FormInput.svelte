<script lang="ts">
    export let label: string;
    export let id: string;
    export let help: string | undefined;
    export let type: string = "text";

</script>

<div class="mb-3">
    <label for={id} class="form-label">{label}</label>
    <input {id} {type} class="form-control" class:is-invalid={help} on:input />
    {#if help}
        <span class="invalid-feedback" role="alert">{help}</span>
    {/if}
</div>