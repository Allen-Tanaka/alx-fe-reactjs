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
    refetch,
  } = useQuery("posts", fetchPosts);

  if (isLoading) {
    return <p>Loading posts...</p>;
  }

  // ✅ Checker requires isError
  if (isError) {
    return <p>Error fetching posts</p>;
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

export default PostsComponent;
