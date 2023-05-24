import { configureStore } from "@reduxjs/toolkit";
import postsSlice, { PostsState } from "./slices/posts.slice";
import usersSlice from "./slices/users.slice";

// export interface RootState {
// 	posts: PostsState;
// }

const store = configureStore({
	reducer: {
		posts: postsSlice,
		users: usersSlice,
	},
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
