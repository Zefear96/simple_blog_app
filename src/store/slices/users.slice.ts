import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createPost } from "../../services/createPost";
import { updatePost } from "../../services/updatePost";
import { deletePost } from "../../services/deletePost";
import { User } from "../../utils/types";
import { fetchUsers } from "../../services/fetchUsers";

export interface PostsState {
	data: User[];
	loading: boolean;
	error: string | null;
}

const initialState: PostsState = {
	data: [],
	loading: false,
	error: null,
};

const usersSlice = createSlice({
	name: "users",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchUsers.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchUsers.fulfilled, (state, action) => {
				state.loading = false;
				state.data = action.payload;
			})
			.addCase(fetchUsers.rejected, (state, action) => {
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
				const postIndex = state.data.findIndex((post) => post.id === id);
				if (postIndex !== -1) {
					state.data[postIndex] = { ...state.data[postIndex], ...postData };
				}
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

export default usersSlice.reducer;
