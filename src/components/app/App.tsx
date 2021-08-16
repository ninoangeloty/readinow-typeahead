import { useEffect, useState } from "react";
import "../../shared/styles/main.css";
import "./App.css";
import Typeahead from "../typeahead/typeahead";
import GitHubService from "../../services/github.service";
import { GitHubRepo } from "../../shared/models/github";

function App() {
  const [data, setData] = useState<GitHubRepo[]>([]);
  const githubService = new GitHubService();

  useEffect(() => {
    async function fetch() {
      const result = await githubService.getRepos();
      setData(result);
    }
    fetch();
  });

  return (
    <div className="container">
      <div className="card w-75">
        <div className="title">Repositories under Defunkt</div>
        <p className="m-0 mb-1">Select a repository to view the details:</p>
        <Typeahead
          className="w-50"
          labelKey="name"
          descriptionKey="description"
          // sortKey
          placeholderText="Select Repository..."
          minimumLength={0} // necessary when data is not preloaded - use debounce mechanism
          maxItems={10}
          data={data}
        />
        <div className="buttons">
          <button type="button" className="btn btn-light">
            Cancel
          </button>
          <button type="button" className="btn btn-primary">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
