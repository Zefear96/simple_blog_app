import { useSelector } from "react-redux";
import React, { useEffect } from "react";
import { fetchPosts } from "../../services/fetchPosts";
import PostElement from "./PostElement";
import { Post } from "../../utils/types";
import { RootState } from "../../store/store";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import Spinner from "../Spinner";
import { fetchUsers } from "../../services/fetchUsers";
import { useSearchParams } from "react-router-dom";

const PostsList = () => {
	const dispatch = useAppDispatch();
	const posts = useAppSelector((state) => state.posts.data);
	const loading = useAppSelector((state) => state.posts.loading);
	const error = useAppSelector((state) => state.posts.error);
	const users = useAppSelector((state) => state.users.data);
	const [searchParams, setSearchParams] = useSearchParams();

	useEffect(() => {
		dispatch(fetchPosts());
		dispatch(fetchUsers());
	}, [dispatch]);

	// const handleCreatePost = () => {
	// 	const newPost = { title: "New Post", body: "This is a new post." };
	// 	dispatch(createPost(newPost));
	// };

	// const handleUpdatePost = (postId: number) => {
	// 	const updatedPost = {
	// 		title: "Updated Post",
	// 		body: "This post has been updated.",
	// 	};
	// 	dispatch(updatePost({ id: postId, postData: updatedPost }));
	// };

	// const handleDeletePost = (postId: number) => {
	// 	dispatch(deletePost(postId));
	// };
	function handleFindAuthor(post: Post) {
		const user = users.find((user) => user.id === post.userId);
		return user ? user.name : "";
	}

	if (loading) {
		return (
			<div className=" mx-auto grid grid-cols-1">
				<Spinner />
			</div>
		);
	}

	if (error) {
		return <div>Error: {error}</div>;
	}

	return (
		<section className="">
			{loading ? (
				<div className=" ">
					<Spinner />
				</div>
			) : (
				<div className=" w-3/4 grid grid-cols-3 mx-auto gap-5 m-10 max-md:grid-cols-1">
					{posts.map((post) => (
						<PostElement
							key={post.id}
							post={post}
							loading={loading}
							author={handleFindAuthor(post)}
						/>
					))}
				</div>
			)}
		</section>
	);
};

export default PostsList;
