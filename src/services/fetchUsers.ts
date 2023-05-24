import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../utils/constants";
import { User } from "../utils/types";

export const fetchUsers = createAsyncThunk<User[]>(
	"posts/fetchUsers",
	async () => {
		try {
			const { data } = await axios.get(`${API_URL}/users`);
			console.log(data);

			return data;
		} catch (error) {
			throw new Error("Failed to fetch posts.");
		}
	},
);
