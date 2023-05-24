import React from "react";
import { Routes, Route } from "react-router-dom";
import PostsList from "./components/post/PostsList";
import PostDetails from "./components/post/PostDetails";

const MainRoutes = () => {
	return (
		<Routes>
			<Route path="/" element={<PostsList />} />
			<Route path="/details/:id" element={<PostDetails />} />
		</Routes>
	);
};

export default MainRoutes;
