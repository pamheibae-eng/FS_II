import "./App.css";
import PostComposer from "./components/PostComposer";

function App() {
  return (
    <div className="app">
      <h1>Multi-Platform Post Composer</h1>
      <p>
        Compose your social media post with platform-specific validation.
      </p>

      <PostComposer />
    </div>
  );
}

export default App;