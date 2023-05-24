import React, { useState } from "react";
import { Post } from "../utils/types";

type PaginationProps = {
	pageNumbers: number[];
	currentPage: number;
	handlePageChange: (pageNumber: number) => void;
};

const Pagination = ({
	pageNumbers,
	currentPage,
	handlePageChange,
}: PaginationProps) => {
	return (
		<div className="flex justify-center mt-5">
			{pageNumbers.map((pageNumber, index) => (
				<button
					key={pageNumber}
					onClick={() => handlePageChange(pageNumber)}
					className={`${
						currentPage === pageNumber ? "bg-orange-400" : "bg-green-400"
					} cursor-pointer border rounded-md mx-1 w-10 h-10`}
				>
					{pageNumber}
				</button>
			))}
		</div>
	);
};

export default Pagination;
