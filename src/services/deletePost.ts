import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../utils/constants";

export const deletePost = createAsyncThunk("posts/deletePost", async (id) => {
	try {
		await axios.delete(`${API_URL}/posts/${id}`);
		return id;
	} catch (error) {
		throw new Error("Failed to delete the post.");
	}
});
