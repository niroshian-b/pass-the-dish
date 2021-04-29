import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../firebase';
import { useHistory } from 'react-router-dom';
export const AuthContext = createContext();

export const useAuth = () => {
	return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [user, setUser] = useState(null);
	const [openLogin, setOpenLogin] = useState(false);
	const [openRegister, setOpenRegister] = useState(false);

	const history = useHistory();

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((authUser) => {
			if (authUser) {
				setUser(authUser);
				if (!authUser.displayName) {
					return authUser.updateProfile({ displayName: username });
				}
			} else {
				setUser(null);
			}
		});

		return () => {
			unsubscribe();
		};
	}, [user, username]);

	const handleSignUp = (e) => {
		e.preventDefault();

		auth.createUserWithEmailAndPassword(email, password)
			.then((authUser) => {
				return authUser.updateProfile({ displayName: username });
			})
			.then((updatedUser) => setUser(updatedUser))
			.catch((err) => console.log(err.message));
	};

	const handleSignOut = () => {
		return auth.signOut().then(() => history.push('/'));
	};

	const handleSignIn = (e) => {
		e.preventDefault();

		auth.signInWithEmailAndPassword(email, password).catch((err) =>
			alert(err.message)
		);
	};

	const handlePasswordReset = (e) => {
		e.preventDefault();

		return auth.sendPasswordResetEmail(email);
	};

	return (
		<AuthContext.Provider
			value={{
				username,
				setUsername,
				email,
				setEmail,
				password,
				setPassword,
				handleSignUp,
				handleSignOut,
				handleSignIn,
				handlePasswordReset,
				user,
				openLogin,
				setOpenLogin,
				openRegister,
				setOpenRegister,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
