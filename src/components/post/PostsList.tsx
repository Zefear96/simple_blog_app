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
import Search from "../Search";

const PostsList = () => {
	const dispatch = useAppDispatch();
	const posts = useAppSelector((state) => state.posts.data);
	const loading = useAppSelector((state) => state.posts.loading);
	const error = useAppSelector((state) => state.posts.error);
	const users = useAppSelector((state) => state.users.data);

	// Pagination
	const [currentPage, setCurrentPage] = useState(1);
	const postsPerPage = 6; // Количество постов, отображаемых на текущей страницы
	const indexOfLastPost = currentPage * postsPerPage;
	const indexOfFirstPost = indexOfLastPost - postsPerPage;
	const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
	const totalPages = Math.ceil(posts.length / postsPerPage);
	const pageRange = 2; // Количество цифр, отображаемых с обеих сторон текущей страницы
	const startPage = Math.max(currentPage - pageRange, 1);
	const endPage = Math.min(currentPage + pageRange, totalPages);

	// Search
	const [searchQuery, setSearchQuery] = useState("");

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

	function handleSetAuthor(post: Post) {
		const user = users.find((user) => user.id === post.userId);
		return user ? user.name : "";
	}

	function handleFind(post: Post) {
		const author = handleSetAuthor(post);
		const authorMatch = author
			.toLowerCase()
			.includes(searchQuery.toLowerCase());
		const titleMatch = post.title
			.toLowerCase()
			.includes(searchQuery.toLowerCase());
		return authorMatch || titleMatch;
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
			<div>
				<Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
			</div>
			<div className=" w-3/4 grid grid-cols-3 mx-auto gap-5 m-10 max-lg:grid-cols-2 max-sm:grid-cols-1">
				{currentPosts.length > 0 &&
				currentPosts.filter(handleFind).length > 0 ? (
					currentPosts
						.filter(handleFind)
						.map((post) => (
							<PostElement
								key={post.id}
								post={post}
								loading={loading}
								author={handleSetAuthor(post)}
							/>
						))
				) : (
					<p className=" text-center text-2xl col-span-3">Nothing found :(</p>
				)}
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
