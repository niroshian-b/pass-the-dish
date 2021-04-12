import React from 'react';
import styled from 'styled-components';

const Register = () => {
	return (
		<Wrapper>
			<h1>Register</h1>
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
							placeholder="Your "
						/>
					</FormItem>
				</PersonalInfo>
				<Experience>
					<h2>What level of cook are you?</h2>
					<div>
						<label>
							<input
								type="radio"
								name="amateur"
								value="amateur"
							/>
							Amateur
						</label>
						<label>
							<input
								type="radio"
								name="homeCook"
								value="homeCook"
							/>
							Home Cook
						</label>
						<label>
							<input
								type="radio"
								name="culinaryProfessional"
								value="culinaryProfessional"
							/>
							Culinary Professional
						</label>
					</div>
				</Experience>
			</form>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	box-shadow: 0 0 30px 15px rgba(44, 26, 8, 0.263);
	max-width: 1000px;
	display: flex;
	position: relative;
	z-index: 2;
`;
const Section = styled.div``;
const PersonalInfo = styled(Section)``;
const Experience = styled(Section)``;
const Name = styled.div``;
const FormItem = styled.div``;

export default Register;
