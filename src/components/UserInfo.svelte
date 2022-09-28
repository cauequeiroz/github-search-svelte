<script lang="ts">
    import type { IUser } from "../interfaces/IUser";

    import UserRepositories from "./UserRepositories.svelte";

    export let user: IUser;
</script>

<div class="user-card">
    <img src={user.avatar_url} alt="user avatar from github profile" />

    <div class="user-info">
        <p>{user.name} ({user.login})</p>
        <p><i>{user.bio}</i></p>

        <p><strong>Repositories:</strong> {user.public_repos}</p>
        <p><strong>Followers:</strong> {user.followers}</p>
        <a href={user.html_url} target="_blank">Profile page</a>
    </div>

    <UserRepositories profileName={user.login} />
</div>

<style>
    .user-card {
        text-align: left;
        display: flex;
        flex-direction: row;
        justify-content: center;
        margin-top: 100px;
    }
    
    img {
        width: 200px;
        border: 4px solid #ccc;
        border-radius: 8px;
        margin-right: 24px;
    }

    .user-info {
        margin-right: 48px;
    }

    .user-info p {
        margin: 0 0 12px;
    }
</style>