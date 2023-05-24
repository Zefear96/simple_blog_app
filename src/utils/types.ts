export type Post = {
	userId: number;
	id: number;
	title: string;
	body: string;
};

export type User = {
	id: 1;
	username: string;
	name: string;
	email: string;
	address: Address;
};

export type Address = {
	street: string;
	suite: string;
	city: string;
	zipcode: string;
	geo: {
		lat: string;
		lng: string;
	};
};
