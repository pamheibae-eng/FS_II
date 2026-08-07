import { useDispatch, useSelector } from "react-redux";
import { addPost, deletePost, editPost } from "./features/posts/postsSlice";
import type { AppDispatch, RootState } from "./app/store";
function App() {
  const posts = useSelector((state: RootState) => state.posts.posts);

const platforms = useSelector(
  (state: RootState) => state.platforms.platforms
);

const dispatch = useDispatch<AppDispatch>();

  return (
    <div>
      <h1>Redux Toolkit Demo</h1>
      <h2>Platforms</h2>

<ul>
  {platforms.map((platform) => (
    <li key={platform}>{platform}</li>
  ))}
</ul>
      <h2>Posts</h2>
      <button
  onClick={() =>
    dispatch(
      addPost({
        id: Date.now(),
        title: "My First Post",
        content: "Learning Redux Toolkit",
      })
    )
  }
>
  Add Post
</button>
      {posts.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        posts.map((post) => (
  <div key={post.id}>
    <h3>{post.title}</h3>
    <p>{post.content}</p>

    <button onClick={() => dispatch(deletePost(post.id))}>
      Delete
    </button>
    <button
  onClick={() =>
    dispatch(
      editPost({
        id: post.id,
        title: "Updated Post",
        content: "This post has been edited!",
      })
    )
  }
>
  Edit
</button>
  </div>
))
      )}
    </div>
  );
}

export default App;