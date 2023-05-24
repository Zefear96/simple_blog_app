import { Post } from "../utils/types";

interface SearchProps {
	searchQuery: string;
	setSearchQuery: (query: string) => void;
}

const Search = ({ searchQuery, setSearchQuery }: SearchProps) => {
	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(e.target.value);
	};

	return (
		<div>
			<input
				type="text"
				value={searchQuery}
				onChange={handleSearchChange}
				placeholder="Search"
				className="border border-blue-500 p-2 rounded-lg my-10"
			/>
		</div>
	);
};

export default Search;
