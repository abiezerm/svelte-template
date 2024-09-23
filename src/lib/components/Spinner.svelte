<script lang="ts">
    export let size: string = "sm";
</script>

<span 
    class="spinner-border" 
    class:spinner-border-sm={size === "sm"} 
    class:spinner-border-lg={size === "lg"}
    role="status">
</span>