import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

import SubmitButton from './Modal/SubmitButton';

import { useAuth } from '../Contexts/AuthContext';

//Editting the User Profile
const EditUser = () => {
	const history = useHistory();
	const emailRef = useRef();
	const passwordRef = useRef();
	const passwordConfirmRef = useRef();
	const { currentUser, updateEmail, updatePassword } = useAuth();

	const [error, setError] = useState();
	const [loading, setLoading] = useState();

	const handleSubmit = (e) => {
		e.preventDefault();

		const promises = [];
		//check which values have been changed in the form
		if (emailRef.current.value !== currentUser.email) {
			promises.push(updateEmail(emailRef.current.value));
		}
		if (passwordRef.current.value) {
			//verify password and strength of password
			if (
				passwordRef.current.value !== passwordConfirmRef.current.value
			) {
				return setError('Passwords do not match');
			}
			if (passwordRef.current.value.length < 6) {
				return setError(
					'Password is weak. It must be 6 characters or longer'
				);
			}
			promises.push(updatePassword(passwordRef.current.value));
		}

		Promise.all(promises)
			.then(() => {
				history.push('/');
				//refresh the page to update the header
				window.location.reload();
			})
			.catch(() => {
				setError('Failed update account');
			})
			.finally(() => {
				setLoading(false);
			});
	};
	console.log(currentUser);
	return (
		<Wrapper>
			<Form onSubmit={handleSubmit}>
				{error && <p>{error}</p>}
				<H2>Edit User Profile</H2>
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
						/>
					</LeftContainer>
					<RightContainer>
						<Label htmlFor="lastName">Last Name</Label>
						<Input
							id="lastName"
							name="lastName"
							type="text"
							placeholder="Your last name"
						/>
					</RightContainer>
				</TextGroup>
				<H2>What Level of Cook are You?</H2>
				<Experience>
					<label>
						<input type="radio" name="experience" value="amateur" />
						Amateur
					</label>
					<label>
						<input
							type="radio"
							name="experience"
							value="homeCook"
						/>
						Home Cook
					</label>
					<label>
						<input
							type="radio"
							name="experience"
							value="culinaryPro"
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
