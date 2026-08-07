import "./App.css";
import PostComposer from "./components/PostComposer";

function App() {
  return (
    <div className="app">
      <div className="container">
        <h1>Multi-Platform Post Composer</h1>
        <p className="subtitle">
          Compose your social media post with platform-specific validation.
        </p>

        <PostComposer />
      </div>
    </div>
  );
}

export default App;