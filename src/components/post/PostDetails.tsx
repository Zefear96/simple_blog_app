import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import Spinner from "../Spinner";
import { Post } from "../../utils/types";
import { useNavigate } from "react-router-dom";

import { TiArrowBack } from "@react-icons/all-files/ti/TiArrowBack";
import { fetchUsers } from "../../services/fetchUsers";
import { fetchPosts } from "../../services/fetchPosts";

const PostDetails = () => {
	const { id } = useParams();
	const dispatch = useAppDispatch();
	const data = useAppSelector((state) =>
		state.posts.data.find((p) => p.id === Number(id)),
	);
	const loading = useAppSelector((state) => state.posts.loading);
	const error = useAppSelector((state) => state.posts.error);
	const users = useAppSelector((state) => state.users.data);
	const navigate = useNavigate();

	useEffect(() => {
		dispatch(fetchPosts());
		dispatch(fetchUsers());
	}, [dispatch]);

	const author = users.find((user) => user.id === data?.userId)?.name;

	if (loading) {
		return (
			<div className="flex justify-center items-center h-screen">
				<Spinner />
			</div>
		);
	}

	if (error) {
		return (
			<div className="flex justify-center items-center h-screen">
				Error: {error}
			</div>
		);
	}

	if (!data) {
		return (
			<div className="flex justify-center items-center h-screen">
				Post not found
			</div>
		);
	}

	return (
		<section className=" w-3/4 mx-auto my-20 text-lg">
			<button
				className=" border-yellow-500 flex items-center p-2 transition-all hover:scale-125 "
				onClick={() => navigate(-1)}
			>
				<TiArrowBack className=" mr-1" color="red" /> Back
			</button>
			<div className=" shadow-2xl p-5 mx-auto mt-20 rounded-xl">
				<div className="">
					<h1 className="text-orange-500 font-bold my-5">
						{data.title.toUpperCase()}
					</h1>
				</div>
				<p className=" text-blue-500">id: {data.id}</p>

				<p>{data.body.charAt(0).toUpperCase() + data.body}</p>
				<p className="my-3">
					created by:<span className="text-purple-600"> {author}</span>
				</p>
			</div>
		</section>
	);
};

export default PostDetails;
