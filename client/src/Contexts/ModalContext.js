import React, { createContext, useState } from 'react';

export const ModalContext = createContext(null);

export const ModalProvider = ({ children }) => {
	const [showModal, setShowModal] = useState(null);

	return (
		<ModalContext.Provider value={{ showModal, setShowModal }}>
			{children}
		</ModalContext.Provider>
	);
};
