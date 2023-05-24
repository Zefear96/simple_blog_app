import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import Spinner from "../Spinner";
import { Post } from "../../utils/types";
import { useNavigate } from "react-router-dom";

import { TiArrowBack } from "@react-icons/all-files/ti/TiArrowBack";

const PostDetails = () => {
	const { id } = useParams();
	const dispatch = useAppDispatch();
	const data = useAppSelector((state) =>
		state.posts.data.find((p) => p.id === Number(id)),
	);
	const loading = useAppSelector((state) => state.posts.loading);
	const error = useAppSelector((state) => state.posts.error);
	const [post, setPost] = useState<Post | null>(null); // Store post data in local state
	const navigate = useNavigate();

	useEffect(() => {
		// Set the post data in local state when it is fetched
		if (data) {
			setPost(data);
		}
	}, [data]);

	if (loading) {
		return (
			<div className="mx-auto grid grid-cols-1">
				<Spinner />
			</div>
		);
	}

	if (error) {
		return <div>Error: {error}</div>;
	}

	if (!post) {
		return <div>Post not found</div>;
	}

	return (
		<div className="w-3/4 shadow-2xl p-5 mx-auto mt-20 rounded-xl">
			<button
				className=" border-yellow-500 flex items-center p-2 transition-all hover:scale-125 "
				onClick={() => navigate(-1)}
			>
				<TiArrowBack className=" mr-1" color="red" /> Back
			</button>
			<div className="">
				<h1 className="text-orange-500 font-bold my-5">
					{post.title.toUpperCase()}
				</h1>
			</div>
			<p className=" text-blue-500">id: {post.id}</p>

			<p>{post.body.charAt(0).toUpperCase() + post.body}</p>
			<p className="my-3">
				{/* created by:<span className="text-purple-600"> {post.author}</span> */}
			</p>
		</div>
	);
};

export default PostDetails;
