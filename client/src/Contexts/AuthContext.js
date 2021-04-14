import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../firebase';

export const AuthContext = createContext();

export const useAuth = () => {
	return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState();
	const [loading, setLoading] = useState(true);

	const handleSignUp = async (email, password) => {
		return auth.createUserWithEmailAndPassword(email, password);
	};

	const handleSignIn = async (email, password) => {
		return auth.signInWithEmailAndPassword(email, password);
	};

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			setCurrentUser(user);
			setLoading(false);
		});

		return unsubscribe;
	}, []);

	return (
		<AuthContext.Provider
			value={{ currentUser, handleSignUp, handleSignIn }}
		>
			{!loading && children}
		</AuthContext.Provider>
	);
};
