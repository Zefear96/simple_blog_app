import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../utils/constants";

export const createPost = createAsyncThunk(
	"posts/createPost",
	async (postData) => {
		try {
			const response = await axios.post(`${API_URL}/posts`, postData);
			return response.data;
		} catch (error) {
			throw new Error("Failed to create a new post.");
		}
	},
);
