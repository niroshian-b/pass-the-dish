import React, { createContext, useContext, useState, useEffect } from 'react';
import firebase from 'firebase';
import { auth, db } from '../firebase';
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
				setUser(auth.currentUser);
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
				db.collection('users').doc(authUser.user.uid).set({
					timestamp: firebase.firestore.FieldValue.serverTimestamp(),
					displayName: username,
					email: authUser.user.email,
					photoURL: authUser.user.photoURL,
					emailVerified: authUser.user.emailVerified,
				});
				return authUser.updateProfile({ displayName: username });
			})
			.then((updatedUser) => setUser(updatedUser))
			.catch((err) => console.log(err.message));
	};

	const handleSignOut = () => {
		return auth.signOut().then(() => {
			setUser(null);
			setPassword('');
			setEmail('');
			setUsername('');
			return history.push('/');
		});
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

	const handleUsernameChange = (newUsername) => {};

	const handleDisplayPictureChange = (photoURL) => {
		return user
			.updateProfile({ photoURL })
			.then(() => {
				console.log('success');
			})
			.catch((err) => console.error(err));
	};

	const handleEmailChange = (email) => {};

	const handlePasswordChange = (password) => {};

	const handleReauthentication = () => {};

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
				handleUsernameChange,
				handleDisplayPictureChange,
				handleEmailChange,
				handlePasswordChange,
				handleReauthentication,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
