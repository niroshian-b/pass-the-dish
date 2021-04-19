import React, { createContext, useContext } from 'react';
export const DbContext = createContext();

export const useDb = () => {
	return useContext(DbContext);
};

export const DbProvider = ({ children }) => {
	const uploadUserData = (userId, userData) => {
		fetch('https://localhost:4000/users/' + userId, {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(userData),
		})
			.then((res) => res.json())
			.then((json) => {
				console.log(json.data);
			});
	};

	return (
		<DbContext.Provider value={{ uploadUserData }}>
			{children}
		</DbContext.Provider>
	);
};
