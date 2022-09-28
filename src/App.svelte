<script lang="ts">
    import type { IUser } from './interfaces/IUser';
    import GithubService from './services/GithubService';

	import Search from './components/Search.svelte';
	import Title from './components/Title.svelte';
    import UserInfo from './components/UserInfo.svelte';
	
	enum SearchState {
		INITIAL,
		USER_NOT_FOUND,
		USER_FOUND,
		LOADING
	};

	let user: IUser = null;
	let searchState: SearchState = SearchState.INITIAL;

	async function handleSearch(event: CustomEvent<{
            profileName: string;
	}>) {
		searchState = SearchState.LOADING

		const response = await GithubService.fetchUserByUserName(event.detail.profileName);
		const responseData = await response.json();

		if (response.ok) {
			user = {
				"login": responseData.login,
				"avatar_url": responseData.avatar_url,
				"html_url": responseData.html_url,
				"name": responseData.name,
				"bio": responseData.bio,
				"public_repos": responseData.public_repos,
				"followers": responseData.followers
			}
			searchState = SearchState.USER_FOUND;
		} else {
			searchState = SearchState.USER_NOT_FOUND
		}
	}
</script>

<main>
	<Title />
	<Search on:search={handleSearch} />

	{#if searchState === SearchState.INITIAL}
		<p>...</p>
	{/if}
	{#if searchState === SearchState.LOADING}
		<p>loading...</p>
	{/if}
	{#if searchState === SearchState.USER_FOUND}
		<UserInfo {user} />
	{/if}
	{#if searchState === SearchState.USER_NOT_FOUND}
		<p>user not found.</p>
	{/if}
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 1000px;
		margin: 0 auto;
	}
</style>