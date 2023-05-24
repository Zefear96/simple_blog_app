import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../utils/constants";
import { Post } from "../utils/types";

export const updatePost = createAsyncThunk(
	"posts/updatePost",
	async ({ id, postData }: { id: number; postData: Post }) => {
		try {
			const response = await axios.put(`${API_URL}/posts/${id}`, postData);
			return response.data;
		} catch (error) {
			throw new Error("Failed to update the post.");
		}
	},
);
