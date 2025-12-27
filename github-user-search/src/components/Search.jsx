import { useState } from "react";
import { searchUsers, fetchUserData } from "../services/githubService";

export default function Search() {
  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("");
  const [minRepos, setMinRepos] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const handleSearch = async (e) => {
    e.preventDefault();
    setResults([]);
    setPage(1);
    performSearch(1);
  };

  const performSearch = async (pageNumber) => {
    setLoading(true);
    setError("");

    try {
      const { items, total } = await searchUsers(username, location, minRepos, pageNumber);

      if (items.length === 0) {
        setError("Looks like we cant find the user");
      }

      setResults((prev) => [...prev, ...items]);
      setTotalCount(total);
    } catch (err) {
      setError("Looks like we cant find the user");
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    performSearch(nextPage);
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-6">Advanced GitHub User Search</h2>

      <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 rounded w-full"
        />

        <input
          type="text"
          placeholder="Location (optional)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="border p-2 rounded w-full"
        />

        <input
          type="number"
          placeholder="Min repos (optional)"
          value={minRepos}
          onChange={(e) => setMinRepos(e.target.value)}
          className="border p-2 rounded w-full"
        />

        <button className="col-span-1 md:col-span-3 bg-blue-600 text-white py-2 rounded">
          Search
        </button>
      </form>

      {/* Loading */}
      {loading && <p>Loading...</p>}

      {/* Error */}
      {error && <p className="text-red-600">{error}</p>}

      {/* Results */}
      {results.length > 0 && (
        <div>
          <p className="mb-4 text-gray-600">
            Showing {results.length} of {totalCount} results
          </p>

          <div className="grid gap-4">
            {results.map((user) => (
              <div
                key={user.id}
                className="flex items-center gap-4 p-4 border rounded-lg shadow-sm"
              >
                <img
                  src={user.avatar_url}
                  alt={user.login}
                  className="w-16 h-16 rounded-full"
                />
                <div>
                  <h3 className="font-semibold text-lg">{user.login}</h3>
                  <a
                    href={user.html_url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-500 underline"
                  >
                    View Profile
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {results.length < totalCount && (
            <button
              onClick={loadMore}
              className="mt-6 bg-gray-800 text-white px-5 py-2 rounded"
            >
              Load More
            </button>
          )}
        </div>
      )}
    </div>
  );
}
