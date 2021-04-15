import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

import SubmitButton from './SubmitButton';

import { useAuth } from '../../Contexts/AuthContext';

const Register = () => {
	const history = useHistory();
	const emailRef = useRef();
	const passwordRef = useRef();
	const passwordConfirmRef = useRef();
	const { handleSignUp } = useAuth();

	const [error, setError] = useState();
	const [loading, setLoading] = useState();

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (passwordRef.current.value !== passwordConfirmRef.current.value) {
			return setError('Passwords do not match');
		}
		if (passwordRef.current.value.length < 6) {
			return setError(
				'Password is weak. It must be 6 characters or longer'
			);
		}
		try {
			setError('');
			setLoading(true);
			await handleSignUp(
				emailRef.current.value,
				passwordRef.current.value
			);
			history.push('/home');
		} catch {
			setError('Failed to create an account');
		}
		setLoading(false);
	};

	return (
		<Wrapper>
			<Form onSubmit={handleSubmit}>
				{error && <p>{error}</p>}
				<H2>Login</H2>
				<TextGroup>
					<Email>
						<label htmlFor="email">Email</label>
						<EmailInput
							id="email"
							name="email"
							type="email"
							placeholder="Your email"
							ref={emailRef}
							required
						/>
					</Email>
				</TextGroup>
				<TextGroup>
					<LeftContainer>
						<label htmlFor="password">Password</label>
						<Input
							id="password"
							name="password"
							type="password"
							placeholder="Your password"
							ref={passwordRef}
							required
						/>
					</LeftContainer>
					<RightContainer>
						<label htmlFor="confirmPassword">Confirm</label>
						<Input
							id="confirmPassword"
							name="confirmPassword"
							type="password"
							placeholder="Confirm password"
							ref={passwordConfirmRef}
							required
						/>
					</RightContainer>
				</TextGroup>
				<H2>Personal Information</H2>
				<TextGroup>
					<LeftContainer>
						<label htmlFor="firstName">First Name</label>
						<Input
							id="firstName"
							name="firstName"
							type="text"
							placeholder="Your first name"
							required
						/>
					</LeftContainer>
					<RightContainer>
						<label htmlFor="lastName">Last Name</label>
						<Input
							id="lastName"
							name="lastName"
							type="text"
							placeholder="Your last name"
							required
						/>
					</RightContainer>
				</TextGroup>
				<H2>What Level of Cook are You?</H2>
				<Experience>
					<label>
						<input
							type="radio"
							name="experience"
							value="amateur"
							required
						/>
						Amateur
					</label>
					<label>
						<input
							type="radio"
							name="experience"
							value="homeCook"
							required
						/>
						Home Cook
					</label>
					<label>
						<input
							type="radio"
							name="experience"
							value="culinaryPro"
							required
						/>
						Culinary Professional
					</label>
				</Experience>
				<SubmitButton disabled={loading} buttonText={'Register'} />
			</Form>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	width: 100%;
	height: 100%;
`;
const Form = styled.form`
	padding: 0.25em;
`;
const H2 = styled.h2`
	margin-top: 1rem;
`;
const Experience = styled.div`
	display: flex;
	justify-content: space-around;
`;

const TextGroup = styled.div`
	display: flex;
	justify-content: space-between;
`;

const Input = styled.input`
	padding: 0.25em 0.75em;
	margin: 0.125em 0;
`;

const Email = styled.div`
	width: 100%;
`;

const EmailInput = styled(Input)`
	width: calc(100% - 1.75em);
`;

const LeftContainer = styled.div`
	width: 100%;
	margin-right: 1em;
`;
const RightContainer = styled(LeftContainer)`
	margin-left: 10px;
`;

export default Register;
