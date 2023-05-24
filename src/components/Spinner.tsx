import React from "react";

const Spinner = () => {
	return (
		<div
			style={{ borderTop: "transparent" }}
			className="w-16 h-16 border-4 border-red-400 border-double rounded-full animate-spin "
		></div>
	);
};

export default Spinner;
