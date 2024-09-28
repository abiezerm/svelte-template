<script lang="ts">
    import { fade, fly } from "svelte/transition";
    import auth from "../../api/apiCalls.svelte";
    import { Link } from "svelte-routing";
    import UserListItem from "./UserListItem.svelte";
    import Spinner from "./Spinner.svelte";
    import { _ } from "svelte-i18n";

    let page = $state({
        content: [],
        page: 0,
        totalPages: 0,
        isLoading: true,
    });


    const loadData = async (pageNumber: number = 0) => {
        page.isLoading = true;
        const result = await auth.loadUsers(pageNumber);
        page = result.data;
        page.isLoading = false;
    };

    loadData();
</script>

<div class="card">
    <div class="card-header">
        <h3 class="text-center">{$_("users")}</h3>
    </div>
    <!-- <div class="card-body"> -->
    <ul class="list-group list-group-flush">
        {#each page.content as user (user.id)}
            <UserListItem {user} />
           <UserListItem {user} />
        {/each}
    </ul>
    <div class="card-footer text-center">
        {#if page.isLoading}
            <Spinner size="normal" />
        {:else}
            {#if page.page > 0}
                <button 
                    class="btn btn-outline-secondary btn-sm float-start" 
                    in:fade
                    out:fly={{ x: -20, duration: 200 }}
                    onclick={() => loadData(page.page - 1)}>{$_("previousPage")}</button>
            {/if}
            {#if page.page < page.totalPages - 1}
                <button 
                    class="btn btn-outline-secondary btn-sm float-end" 
                    in:fade
                    out:fly={{ x: 20, duration: 200 }}
                    onclick={() => loadData(page.page + 1)}>{$_("nextPage")}</button>
            {/if}
        {/if}
    </div>
</div>
