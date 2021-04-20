import React, { createContext, useContext } from 'react';
export const DbContext = createContext();

export const useDb = () => {
	return useContext(DbContext);
};

export const DbProvider = ({ children }) => {
	const uploadUserData = (userId, userData) => {
		fetch('http://localhost:4000/data/users/' + userId, {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(userData),
		})
			.then((res) => res.json())
			.then((json) => {
				console.log(json.data);
			})
			.catch((err) => {
				console.error(err);
			});
	};

	const getUserData = async (userId) => {
		const userData = await fetch(
			'http://localhost:4000/data/users/' + userId
		)
			.then((res) => res.json())
			.then((json) => {
				return json.data;
			})
			.catch((err) => {
				console.error(err);
			});

		return userData;
	};

	return (
		<DbContext.Provider value={{ uploadUserData, getUserData }}>
			{children}
		</DbContext.Provider>
	);
};
