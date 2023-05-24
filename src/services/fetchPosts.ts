import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../utils/constants";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
	try {
		const response = await axios.get(`${API_URL}/posts`);
		console.log(response.data);

		return response.data;
	} catch (error) {
		throw new Error("Failed to fetch posts.");
	}
});
