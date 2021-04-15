import React, { useRef, useState, useContext } from 'react';
import styled from 'styled-components';

import Button from '../Button';
import SubmitButton from './SubmitButton';

import { useAuth } from '../../Contexts/AuthContext';
import { ModalContext } from '../../Contexts/ModalContext';
import { useHistory } from 'react-router-dom';

const Login = () => {
	const history = useHistory();
	const emailRef = useRef();
	const passwordRef = useRef();
	const { handleSignIn } = useAuth();
	const { setShowModal } = useContext(ModalContext);
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
			history.push('/home');
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
						type="email"
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
				<Footer>
					<Button
						onClick={() => {
							setShowModal('forgot-password');
						}}
					>
						forgot password?
					</Button>
					<SubmitButton disabled={loading} buttonText={'Login'} />
				</Footer>
			</form>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	width: 100%;
	height: 100%;
	padding: 0.625em;
`;
const InputFields = styled.div`
	display: flex;
	flex-direction: column;
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

const Footer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

export default Login;
