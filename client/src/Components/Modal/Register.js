import React from 'react';
import styled from 'styled-components';

import SubmitButton from './SubmitButton';

const Register = () => {
	return (
		<Wrapper>
			<form>
				<PersonalInfo>
					<h2>Personal Information</h2>
					<Name>
						<FormItem>
							<label for="firstName">First Name</label>
							<input
								id="firstName"
								name="firstName"
								type="text"
								placeholder="Your first name"
							/>
						</FormItem>
						<FormItem>
							<label for="lastName">Last Name</label>
							<input
								id="lastName"
								name="lastName"
								type="text"
								placeholder="Your last name"
							/>
						</FormItem>
					</Name>
					<FormItem>
						<label for="email">Email</label>
						<input
							id="email"
							name="email"
							type="text"
							placeholder="Your email"
						/>
					</FormItem>
				</PersonalInfo>
				<Experience>
					<h2>What Level of Cook are You?</h2>
					<div>
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
					</div>
				</Experience>
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
	padding: 10px;
`;
const PersonalInfo = styled(Section)``;
const Experience = styled(Section)``;
const Name = styled.div``;
const FormItem = styled.div``;

export default Register;
