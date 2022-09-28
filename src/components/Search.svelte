<script lang="ts">
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher<{
        search: {
            profileName: string;
        }
    }>();

    let profileName: string;

    function onFormSubmit() {
        dispatch('search', { profileName });
    }
</script>

<form on:submit|preventDefault={onFormSubmit}>
    <label>
        Profile name:
        <input type="text" bind:value={profileName}>
        <button>Search</button>
    </label>
</form>