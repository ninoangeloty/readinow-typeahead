import { GitHubRepo } from "../shared/models/github";

class GitHubService {
    async getRepos(): Promise<GitHubRepo[]> {
        const response =  await fetch("https://api.github.com/users/defunkt/repos");
        const data = await response.json();
        return data.map((repo: any) => {
            return {
                name: repo.name,
                description: repo.description
            }
        });
    }
}

export default GitHubService;