const GithubService = {
    fetchUserByUserName(profileName: string) {
        return fetch(`https://api.github.com/users/${profileName}`);
    },

    fetchRepositoriesByUserName(profileName: string) {
        return fetch(`https://api.github.com/users/${profileName}/repos?per_page=5&sort=created`);
    }
}

export default GithubService;