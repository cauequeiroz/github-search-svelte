<script lang="ts">
    import { onMount } from "svelte";
    import type { IRepository } from "../interfaces/IRepository";
    import GithubService from "../services/GithubService";

    export let profileName: string;

    let loading: boolean = true;
    let repositories: IRepository[] = [];

    onMount(async () => {
        const response = await GithubService.fetchRepositoriesByUserName(profileName);
        const responseData = await response.json();

        repositories = responseData;
        loading = false; 
    })

    $: userHasNoRepositories = repositories.length === 0;
</script>

<div class="user-repositories">
    {#if loading}
        <p>Loading user repositories...</p>
    {:else if userHasNoRepositories}
        <p>This user has no repositories.</p>
    {:else}
        <p>Here are the last five repositories of this user:</p>
        <ul>
            {#each repositories as repository (repository.id)}
                <li>
                    <a href={repository.html_url} target="_blank">{repository.full_name}</a>
                </li>
            {/each}
        </ul>
    {/if}
</div>

<style>
    .user-repositories {
        min-width: 400px;
    }

    p {
        margin: 0 0 12px;
    }
</style>



