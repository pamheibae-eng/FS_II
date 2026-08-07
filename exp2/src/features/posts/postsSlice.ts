import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface Post {
  id: number;
  title: string;
  content: string;
}

interface PostsState {
  posts: Post[];
}

const initialState: PostsState = {
  posts: [],
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPost: (state, action: PayloadAction<Post>) => {
      state.posts.push(action.payload);
    },

    deletePost: (state, action: PayloadAction<number>) => {
      state.posts = state.posts.filter(
        (post) => post.id !== action.payload
      );
    },

    editPost: (state, action: PayloadAction<Post>) => {
      const index = state.posts.findIndex(
        (post) => post.id === action.payload.id
      );

      if (index !== -1) {
        state.posts[index] = action.payload;
      }
    },
  },
});   // ← You were missing this

export const { addPost, deletePost, editPost } = postsSlice.actions;
export default postsSlice.reducer;