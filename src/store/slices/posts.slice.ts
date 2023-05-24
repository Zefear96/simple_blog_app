import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchPosts } from "../../services/fetchPosts";
import { createPost } from "../../services/createPost";
import { updatePost } from "../../services/updatePost";
import { deletePost } from "../../services/deletePost";
import { Post } from "../../utils/types";

export interface PostsState {
	data: Post[];
	loading: boolean;
	error: string | null;
}

const initialState: PostsState = {
	data: [],
	loading: false,
	error: null,
};

const postsSlice = createSlice({
	name: "posts",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchPosts.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchPosts.fulfilled, (state, action) => {
				state.loading = false;
				state.data = action.payload;
			})
			.addCase(fetchPosts.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message as string;
			})
			.addCase(createPost.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(createPost.fulfilled, (state, action) => {
				state.loading = false;
				state.data.push(action.payload);
			})
			.addCase(createPost.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message as string;
			})
			.addCase(updatePost.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(updatePost.fulfilled, (state, action) => {
				const { id, postData } = action.payload;
				state.data = state.data.map((post) => {
					if (post.id === id) {
						return { ...post, ...postData };
					}
					return post;
				});
				state.loading = false;
			})
			.addCase(updatePost.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message as string;
			})
			.addCase(deletePost.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(deletePost.fulfilled, (state, action) => {
				const postId =
					typeof action.payload === "number"
						? (action.payload as number)
						: action.payload; // Type assertion to number
				state.data = state.data.filter((post) => post.id !== postId);
				state.loading = false;
			})
			.addCase(deletePost.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message as string;
			});
	},
});

export default postsSlice.reducer;
