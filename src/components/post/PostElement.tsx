import React from "react";
import { Post } from "../../utils/types";
import { useNavigate } from "react-router-dom";

const PostElement = ({
	post,
	loading,
	author,
}: {
	post: Post;
	loading: boolean;
	author: string;
}) => {
	const navigate = useNavigate();

	return (
		<div className=" shadow-lg mx-auto border-solid p-4 rounded-xl">
			<div className=" h-14">
				<h1 className=" text-orange-500 font-bold mt-5">
					{post.title.toUpperCase()}
				</h1>
			</div>

			<p className=" h-24">
				{post.body.charAt(0).toUpperCase() +
					post.body.substring(0, 120) +
					"..."}
			</p>
			<p className=" my-3">
				created by:
				<span className=" text-purple-600 "> {author}</span>
			</p>
			<button
				className=" bg-green-500 rounded-lg p-2 text-white hover:scale-105 transition-all hover:bg-green-600"
				onClick={() => navigate(`/details/${post.id}`)}
			>
				See more
			</button>
		</div>
	);
};

export default PostElement;
