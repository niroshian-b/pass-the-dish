import React from 'react';
import styled from 'styled-components';

import SubmitButton from './SubmitButton';

const Register = () => {
	return (
		<Wrapper>
			<form>
				<PersonalInfo>
					<h2>Personal Information</h2>
					<TextGroup>
						<div>
							<label for="firstName">First Name</label>
							<Input
								id="firstName"
								name="firstName"
								type="text"
								placeholder="Your first name"
							/>
						</div>
						<div>
							<label for="lastName">Last Name</label>
							<Input
								id="lastName"
								name="lastName"
								type="text"
								placeholder="Your last name"
							/>
						</div>
					</TextGroup>
					<TextGroup>
						<Email>
							<label for="email">Email</label>
							<EmailInput
								id="email"
								name="email"
								type="text"
								placeholder="Your email"
							/>
						</Email>
					</TextGroup>
				</PersonalInfo>
				<Section>
					<h2>What Level of Cook are You?</h2>
					<Experience>
						<label>
							<input
								type="radio"
								name="experience"
								value="amateur"
							/>
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
								value="culinaryProfessional"
							/>
							Culinary Professional
						</label>
					</Experience>
				</Section>
				<SubmitButton buttonText={'Register'} />
			</form>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	width: 100%;
	height: 100%;
`;
const Section = styled.div`
	padding: 0.625em;
`;
const PersonalInfo = styled(Section)``;

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
	margin: 0.25em 0;
`;

const Email = styled.div`
	width: 100%;
`;

const EmailInput = styled(Input)`
	width: calc(100% - 1.75em);
`;

export default Register;
