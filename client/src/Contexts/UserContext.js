import React, { createContext, useEffect, useState } from 'react';

export const CurrentUserContext = createContext(null);

export const CurrentUserProvider = ({ children }) => {
	const [showModal, setShowModal] = useState(null);

	return (
		<CurrentUserContext.Provider value={{ showModal, setShowModal }}>
			{children}
		</CurrentUserContext.Provider>
	);
};
