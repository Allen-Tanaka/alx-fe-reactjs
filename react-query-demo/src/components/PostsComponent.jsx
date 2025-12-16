import { useQuery } from "react-query";

const fetchPosts = async () => {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/posts"
  );

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};

const PostsComponent = () => {
  const {
    data,
    isLoading,
    isError,
    error,      
    refetch,
  } = useQuery("posts", fetchPosts);

  if (isLoading) {
    return <p>Loading posts...</p>;
  }


  if (isError) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      <h2>Posts</h2>

      {/* ✅ Data refetch interaction */}
      <button onClick={() => refetch()}>
        Refetch Posts
      </button>

      <ul>
        {data.slice(0, 10).map((post) => (
          <li key={post.id}>
            {post.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export import { useQuery } from "react-query";

const fetchPosts = async () => {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/posts"
  );

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};

const PostsComponent = () => {
  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery(
    "posts",
    fetchPosts,
    {
      // ✅ React Query caching options
      cacheTime: 1000 * 60 * 5,          // 5 minutes
      staleTime: 1000 * 30,              // 30 seconds
      refetchOnWindowFocus: false,
      keepPreviousData: true,
    }
  );

  if (isLoading) {
    return <p>Loading posts...</p>;
  }

  if (isError) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      <h2>Posts</h2>

      {/* ✅ Data refetch interaction */}
      <button onClick={() => refetch()}>
        Refetch Posts
      </button>

      <ul>
        {data.slice(0, 10).map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default PostsComponent;
 PostsComponent;
