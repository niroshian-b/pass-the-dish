import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

import SubmitButton from './Modal/SubmitButton';

import { useAuth } from '../Contexts/AuthContext';

const EditUser = () => {
	const history = useHistory();
	const emailRef = useRef();
	const passwordRef = useRef();
	const passwordConfirmRef = useRef();
	const { currentUser } = useAuth();

	const [error, setError] = useState();
	const [loading, setLoading] = useState();

	const handleSubmit = async (e) => {
		//e.preventDefault();
		//
		//if (passwordRef.current.value !== passwordConfirmRef.current.value) {
		//	return setError('Passwords do not match');
		//}
		//if (passwordRef.current.value.length < 6) {
		//	return setError(
		//		'Password is weak. It must be 6 characters or longer'
		//	);
		//}
		//try {
		//	setError('');
		//	setLoading(true);
		//} catch {
		//	setError('Failed to updated profile');
		//}
		//setLoading(false);
	};
	console.log(currentUser);
	return (
		<Wrapper>
			<Form onSubmit={handleSubmit}>
				{error && <p>{error}</p>}
				<H2>Login</H2>
				<TextGroup>
					<Email>
						<Label htmlFor="email">Email</Label>
						<EmailInput
							id="email"
							name="email"
							type="email"
							placeholder="Your email"
							ref={emailRef}
							defaultValue={currentUser.email}
							required
						/>
					</Email>
				</TextGroup>
				<TextGroup>
					<LeftContainer>
						<Label htmlFor="password">Password</Label>
						<Input
							id="password"
							name="password"
							type="password"
							placeholder="Leave blank to keep the same password"
							ref={passwordRef}
							required
						/>
					</LeftContainer>
					<RightContainer>
						<Label htmlFor="confirmPassword">Confirm</Label>
						<Input
							id="confirmPassword"
							name="confirmPassword"
							type="password"
							placeholder="Leave blank to keep the same password"
							ref={passwordConfirmRef}
							required
						/>
					</RightContainer>
				</TextGroup>
				<H2>Personal Information</H2>
				<TextGroup>
					<LeftContainer>
						<Label htmlFor="firstName">First Name</Label>
						<Input
							id="firstName"
							name="firstName"
							type="text"
							placeholder="Your first name"
							required
						/>
					</LeftContainer>
					<RightContainer>
						<Label htmlFor="lastName">Last Name</Label>
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
				<SubmitButton
					disabled={loading}
					buttonText={'Update Profile'}
				/>
			</Form>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	padding: 1.25em;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	align-items: center;
	position: relative;
	z-index: 2;
`;

const Form = styled.form`
	padding: 0.25em;
`;
const H2 = styled.h2`
	margin-top: 1rem;
`;

const Container = styled.div`
	width: calc(50%);
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
	margin: 0.125em;
	width: 100%;
`;

const Email = styled.div`
	width: 100%;
`;

const EmailInput = styled(Input)`
	width: calc(100%);
`;

const Label = styled.label``;

const LeftContainer = styled.div`
	width: 100%;
	margin-right: 0.875em;
`;
const RightContainer = styled(LeftContainer)`
	margin-right: 0;
	margin-left: 0.875em;
`;
export default EditUser;
