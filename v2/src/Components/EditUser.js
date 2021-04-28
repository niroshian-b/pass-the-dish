import React from 'react';
import styled from 'styled-components';

const EditUser = () => {
	return (
		<Wrapper>
			<Form>
				<h1>Edit User Profile</h1>
				<Auth>
					<h2>User Authentication</h2>
					<Label>New Username</Label>
					<Label>New Password</Label>
					<Label>Confirm New Password</Label>
				</Auth>
				<Personalization>
					<h2>Personalization</h2>
					<Label>Display Picture</Label>
					<Label>Display Name</Label>
				</Personalization>
			</Form>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	display: flex;
	justify-content: center;
	background-color: var(--background-color);
`;

const Form = styled.form`
	max-width: 700px;
	padding: 40px 20px;
	background-color: white;

	border: 1px solid lightgray;
	border-top: none;
`;

const FormSection = styled.div`
	display: flex;
	flex-direction: column;
`;

const Auth = styled(FormSection)``;

const Personalization = styled(FormSection)``;

const Label = styled.label`
	margin: 5px 0;
`;

export default EditUser;
