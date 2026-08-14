import { useState } from "react";
import {
  getUserFromToken,
  hasPermission,
  removeToken,
} from "../utils/auth";

interface DashboardProps {
  onLogout: () => void;
}

interface Post {
  id: number;
  title: string;
  content: string;
}

const defaultPosts: Post[] = [
  {
    id: 1,
    title: "Welcome to Full Stack Development",
    content:
      "This is an example post created for the role-based authorization experiment.",
  },
  {
    id: 2,
    title: "JWT Authentication",
    content:
      "JWT is used to store user identity, role and permissions.",
  },
];

function Dashboard({ onLogout }: DashboardProps) {
  const user = getUserFromToken();

  const [posts, setPosts] = useState<Post[]>(() => {
    const savedPosts = localStorage.getItem("posts");

    if (savedPosts) {
      return JSON.parse(savedPosts);
    }

    localStorage.setItem(
      "posts",
      JSON.stringify(defaultPosts)
    );

    return defaultPosts;
  });

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [editingId, setEditingId] = useState<number | null>(
    null
  );

  const [showCreateForm, setShowCreateForm] =
    useState(false);

  // Post currently being viewed
  const [viewingPost, setViewingPost] =
    useState<Post | null>(null);

  if (!user) {
    return (
      <div className="page">
        <div className="dashboard-card">
          <h1>Access Denied ❌</h1>
          <p>Please login to continue.</p>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    removeToken();
    onLogout();
  };

  const updatePosts = (updatedPosts: Post[]) => {
    setPosts(updatedPosts);

    localStorage.setItem(
      "posts",
      JSON.stringify(updatedPosts)
    );
  };

  // CREATE
  const handleCreatePost = () => {
    if (!hasPermission("create_posts")) {
      alert(
        "❌ Access Denied!\n\nOnly Admin can create posts."
      );
      return;
    }

    if (!title.trim() || !content.trim()) {
      alert("Please enter both title and content.");
      return;
    }

    const newPost: Post = {
      id: Date.now(),
      title: title.trim(),
      content: content.trim(),
    };

    updatePosts([...posts, newPost]);

    setTitle("");
    setContent("");
    setShowCreateForm(false);

    alert("✅ Post created successfully!");
  };

  // EDIT
  const handleEditPost = (post: Post) => {
    if (!hasPermission("edit_posts")) {
      alert(
        `❌ Access Denied!\n\n${user.username} does not have permission to edit posts.`
      );
      return;
    }

    setEditingId(post.id);
    setTitle(post.title);
    setContent(post.content);

    setShowCreateForm(false);
    setViewingPost(null);
  };

  // UPDATE
  const handleUpdatePost = () => {
    if (!hasPermission("edit_posts")) {
      alert("❌ Access Denied!");
      return;
    }

    if (!title.trim() || !content.trim()) {
      alert("Please enter both title and content.");
      return;
    }

    const updatedPosts = posts.map((post) =>
      post.id === editingId
        ? {
            ...post,
            title: title.trim(),
            content: content.trim(),
          }
        : post
    );

    updatePosts(updatedPosts);

    setEditingId(null);
    setTitle("");
    setContent("");

    alert("✅ Post updated successfully!");
  };

  // DELETE
  const handleDeletePost = (id: number) => {
    if (!hasPermission("delete_posts")) {
      alert(
        `❌ Access Denied!\n\n${user.username} does not have permission to delete posts.`
      );
      return;
    }

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );

    if (!confirmDelete) {
      return;
    }

    const updatedPosts = posts.filter(
      (post) => post.id !== id
    );

    updatePosts(updatedPosts);

    // If the deleted post was open, close it
    if (viewingPost?.id === id) {
      setViewingPost(null);
    }

    alert("✅ Post deleted successfully!");
  };

  // VIEW FULL POST
  const handleViewPost = (post: Post) => {
    if (!hasPermission("view_posts")) {
      alert(
        `❌ Access Denied!\n\n${user.username} does not have permission to view posts.`
      );
      return;
    }

    setViewingPost(post);

    // Close other forms
    setEditingId(null);
    setShowCreateForm(false);
  };

  return (
    <div className="dashboard-page">
      <nav className="navbar">
        <div className="brand">
          🔐 AuthSystem
        </div>

        <button
          className="logout-button"
          onClick={handleLogout}
        >
          Logout
        </button>
      </nav>

      <main className="dashboard-container">

        {/* Welcome Card */}

        <div className="welcome-card">
          <div>
            <p className="small-text">
              Welcome back
            </p>

            <h1>
              Hello, {user.username}! 👋
            </h1>

            <span
              className={`role-badge ${user.role}`}
            >
              {user.role === "admin" && "👑 ADMIN"}
              {user.role === "editor" && "✏️ EDITOR"}
              {user.role === "viewer" && "👀 VIEWER"}
            </span>
          </div>

          <div className="shield">
            🛡️
          </div>
        </div>

        {/* Information Cards */}

        <div className="cards">

          <div className="info-card">
            <div className="card-icon">
              🔑
            </div>

            <h3>Authentication</h3>

            <p>
              Your identity has been verified
              using JWT authentication.
            </p>

            <span className="status success">
              ✓ Authenticated
            </span>
          </div>

          <div className="info-card">
            <div className="card-icon">
              🛡️
            </div>

            <h3>Authorization</h3>

            <p>
              Your role controls which post
              actions you can perform.
            </p>

            <span className="status success">
              ✓ Authorization Active
            </span>
          </div>

          <div className="info-card">
            <div className="card-icon">
              🎫
            </div>

            <h3>JWT Token</h3>

            <p>
              Your JWT contains your username,
              role and permissions.
            </p>

            <span className="status success">
              ✓ Token Active
            </span>
          </div>

        </div>

        {/* Posts Section */}

        <div className="permissions-section">

          <div className="section-heading">
            <div>
              <h2>📝 Posts</h2>

              <p>
                Manage posts according to your role.
              </p>
            </div>

            <span className="permission-count">
              {posts.length} posts
            </span>
          </div>

          {/* Create Post - ADMIN ONLY */}

          {hasPermission("create_posts") && (
            <button
              className="login-button"
              onClick={() => {
                setShowCreateForm(!showCreateForm);
                setEditingId(null);
                setViewingPost(null);
                setTitle("");
                setContent("");
              }}
            >
              ➕ Create Post
            </button>
          )}

          {/* Create / Edit Form */}

          {(showCreateForm || editingId !== null) && (
            <div className="info-card">

              <h3>
                {editingId !== null
                  ? "✏️ Edit Post"
                  : "➕ Create New Post"}
              </h3>

              <div className="form-group">
                <label>Title</label>

                <input
                  type="text"
                  placeholder="Enter post title"
                  value={title}
                  onChange={(e) =>
                    setTitle(e.target.value)
                  }
                />
              </div>

              <div className="form-group">
                <label>Content</label>

                <textarea
                  placeholder="Enter post content"
                  value={content}
                  onChange={(e) =>
                    setContent(e.target.value)
                  }
                  rows={5}
                />
              </div>

              <button
                className="login-button"
                onClick={
                  editingId !== null
                    ? handleUpdatePost
                    : handleCreatePost
                }
              >
                {editingId !== null
                  ? "Update Post"
                  : "Save Post"}
              </button>

            </div>
          )}

          {/* FULL POST VIEW */}

          {viewingPost && (
            <div className="info-card">

              <h3>
                📖 {viewingPost.title}
              </h3>

              <p>
                {viewingPost.content}
              </p>

              <button
                className="login-button"
                onClick={() =>
                  setViewingPost(null)
                }
              >
                ← Back to Posts
              </button>

            </div>
          )}

          {/* Posts List */}

          {!viewingPost && (
            <div className="permission-list">

              {posts.length === 0 ? (
                <p>
                  No posts available.
                </p>
              ) : (
                posts.map((post) => (
                  <div
                    key={post.id}
                    className="permission-button allowed"
                  >

                    <span className="permission-icon">
                      📝
                    </span>

                    <span className="permission-text">
                      <strong>
                        {post.title}
                      </strong>

                      <small>
                        {post.content.length > 80
                          ? `${post.content.substring(
                              0,
                              80
                            )}...`
                          : post.content}
                      </small>
                    </span>

                    <span>

                      {/* VIEW - ALL ROLES */}

                      <button
                        onClick={() =>
                          handleViewPost(post)
                        }
                      >
                        👁️
                      </button>

                      {/* EDIT - ADMIN + EDITOR */}

                      {hasPermission("edit_posts") && (
                        <button
                          onClick={() =>
                            handleEditPost(post)
                          }
                        >
                          ✏️
                        </button>
                      )}

                      {/* DELETE - ADMIN ONLY */}

                      {hasPermission("delete_posts") && (
                        <button
                          onClick={() =>
                            handleDeletePost(post.id)
                          }
                        >
                          🗑️
                        </button>
                      )}

                    </span>

                  </div>
                ))
              )}

            </div>
          )}

        </div>

        {/* Security Note */}

        <div className="security-note">
          <strong>
            🔒 Role-Based Authorization
          </strong>

          <p>
            Admin can create, edit and delete
            posts. Editor can edit posts, while
            Viewer can only view posts.
          </p>
        </div>

      </main>
    </div>
  );
}

export default Dashboard;