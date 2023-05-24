import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { fetchPosts } from "../../services/fetchPosts";
import PostElement from "./PostElement";
import { Post } from "../../utils/types";
import { RootState } from "../../store/store";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import Spinner from "../Spinner";
import { fetchUsers } from "../../services/fetchUsers";
import { useSearchParams } from "react-router-dom";
import Pagination from "../Pagination";

const PostsList = () => {
	const dispatch = useAppDispatch();
	const posts = useAppSelector((state) => state.posts.data);
	const loading = useAppSelector((state) => state.posts.loading);
	const error = useAppSelector((state) => state.posts.error);
	const users = useAppSelector((state) => state.users.data);
	const [currentPage, setCurrentPage] = useState(1);
	const postsPerPage = 6;

	const indexOfLastPost = currentPage * postsPerPage;
	const indexOfFirstPost = indexOfLastPost - postsPerPage;
	const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

	const totalPages = Math.ceil(posts.length / postsPerPage);
	const pageRange = 3; // Количество цифр, отображаемых с обеих сторон текущей страницы

	const startPage = Math.max(currentPage - pageRange, 1);
	const endPage = Math.min(currentPage + pageRange, totalPages);

	useEffect(() => {
		dispatch(fetchPosts());
		dispatch(fetchUsers());
	}, [dispatch]);

	const pageNumbers = [];
	for (let i = startPage; i <= endPage; i++) {
		pageNumbers.push(i);
	}

	const handlePageChange = (pageNumber: number) => {
		setCurrentPage(pageNumber);
	};

	function handleFindAuthor(post: Post) {
		const user = users.find((user) => user.id === post.userId);
		return user ? user.name : "";
	}

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

	return (
		<section className=" flex flex-col justify-center items-center m-auto">
			<div className=" w-3/4 grid grid-cols-3 mx-auto gap-5 m-10 max-md:grid-cols-1">
				{currentPosts.map((post) => (
					<PostElement
						key={post.id}
						post={post}
						loading={loading}
						author={handleFindAuthor(post)}
					/>
				))}
			</div>
			<Pagination
				pageNumbers={pageNumbers}
				currentPage={currentPage}
				handlePageChange={handlePageChange}
			/>
		</section>
	);
};

export default PostsList;
