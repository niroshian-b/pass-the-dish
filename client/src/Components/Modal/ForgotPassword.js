import React, { useContext, useRef, useState } from 'react';
import styled from 'styled-components';

import SubmitButton from './SubmitButton';

import { useAuth } from '../../Contexts/AuthContext';
import { ModalContext } from '../../Contexts/ModalContext';

const ForgotPassword = () => {
	const emailRef = useRef();
	const { handleResetPassword } = useAuth();

	const [error, setError] = useState();
	const [prompt, setPrompt] = useState();
	const [loading, setLoading] = useState();

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			setPrompt('');
			setError('');
			setLoading(true);
			await handleResetPassword(emailRef.current.value);
			setPrompt('check your inbox for further instructions');
		} catch {
			setError('Failed to reset Password');
		}
		setLoading(false);
	};

	return (
		<Wrapper>
			<form onSubmit={handleSubmit}>
				{error && <p>{error}</p>}
				{prompt && <p>{prompt}</p>}
				<InputFields>
					<Label htmlFor="email">Email: </Label>
					<Input
						type="email"
						name="email"
						placeholder="Email"
						ref={emailRef}
					/>
				</InputFields>
				<Footer>
					<SubmitButton
						disabled={loading}
						buttonText={'Reset Password'}
					/>
				</Footer>
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

const Footer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

export default ForgotPassword;
