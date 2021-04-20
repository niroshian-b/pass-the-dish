import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../firebase';
export const AuthContext = createContext();

export const useAuth = () => {
	return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState();
	const [loading, setLoading] = useState(true);

	const [error, setError] = useState();

	const handleSignUp = (email, password) => {
		// returns a promise that will create a new user in firebase using email and password
		return auth.createUserWithEmailAndPassword(email, password);
	};

	const handleSignIn = (email, password) => {
		//returns a promise that will sign in the user on firebase using email and password
		return auth.signInWithEmailAndPassword(email, password);
	};

	const handleSignOut = () => {
		//returns a promise that will sign user out on firebase
		return auth.signOut();
	};

	const handleResetPassword = (email) => {
		//returns a promise that will send a password reset email to the email
		return auth.sendPasswordResetEmail(email);
	};

	const updateEmail = (email) => {
		return currentUser.updateEmail(email);
	};

	const updatePassword = (password) => {
		return currentUser.updatePassword(password);
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
			value={{
				currentUser,
				handleSignUp,
				handleSignIn,
				handleSignOut,
				handleResetPassword,
				updateEmail,
				updatePassword,
				error,
				setError,
			}}
		>
			{!loading && children}
		</AuthContext.Provider>
	);
};
