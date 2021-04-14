import React, { useRef, useState } from 'react';
import styled from 'styled-components';

import SubmitButton from './SubmitButton';

import { useAuth } from '../../Contexts/AuthContext';

const Login = () => {
	const emailRef = useRef();
	const passwordRef = useRef();
	const { handleSignIn } = useAuth();

	const [error, setError] = useState();
	const [loading, setLoading] = useState();

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (passwordRef.current.value.length < 6) {
			return setError(
				'Password is weak. It must be 6 characters or longer'
			);
		}
		try {
			setError('');
			setLoading(true);
			await handleSignIn(
				emailRef.current.value,
				passwordRef.current.value
			);
		} catch {
			setError('Failed to sign in');
		}
		setLoading(false);
	};

	return (
		<Wrapper>
			<form onSubmit={handleSubmit}>
				{error && <p>{error}</p>}
				<InputFields>
					<Label htmlFor="email">Email: </Label>
					<Input
						type="text"
						name="email"
						placeholder="Email"
						ref={emailRef}
					/>
					<Label htmlFor="password">Password: </Label>
					<Input
						type="password"
						name="password"
						placeholder="Password"
						ref={passwordRef}
					/>
				</InputFields>
				<SubmitButton buttonText={'Login'} />
			</form>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	width: 100%;
	height: 100%;
`;
const InputFields = styled.div`
	display: flex;
	flex-direction: column;
	padding: 0.625em;
`;
const Label = styled.label`
	color: var(--primary-color);
	font-size: 1.25rem;
	font-weight: bold;
	margin-top: 0.625em;
`;

const Input = styled.input`
	padding: 0.25em 0.75em;
	margin: 0.25em 0;
`;

export default Login;
