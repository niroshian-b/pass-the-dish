import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button } from '@material-ui/core';
import { useAuth } from '../Contexts/AuthContext';

const EditUser = () => {
	const { username, email, user } = useAuth();
	const [newImg, setNewImg] = useState(null);
	const [newUsername, setNewUsername] = useState(null);
	const [newEmail, setNewEmail] = useState(null);
	const [newPassword, setNewPassword] = useState(null);
	const [newPasswordConfirm, setNewPasswordConfirm] = useState(null);
	const [err, setErr] = useState(null);

	const handleChange = (e) => {
		if (e.target.files[0]) {
			//check if the file is an image file
			if (e.target.files[0]['type'].split('/')[0] === 'image') {
				//if it is set the new image to the image
				setNewImg(e.target.files[0]);
				setErr(null);
			} else {
				//if it is not display an error message
				setErr('Make sure the Display Picture is an image file');
			}
		}
	};

	const handleEditSubmission = () => {
		//will change user information based on which inputs are filled
	};

	console.log(newImg);

	useEffect(() => {
		//when the edit user component is loaded, it should check if the user is logged in and then set the newData states to the user's existing data for comparison later
		if (user) {
			setNewUsername(username);
			setNewEmail(email);
			//password is not included for security and will require seperate reauthentaction later with email
		}
	}, [user]);

	return (
		<Wrapper>
			<Form onSubmit={handleEditSubmission}>
				{err && <Error>{`Error: ${err}`}</Error>}
				<h1>Edit User Profile</h1>
				<Personalization>
					<h2>Personalization</h2>
					{newImg && <img></img>}
					<Label>Display Picture</Label>
					<input type="file" onChange={handleChange} />
					<Label>Display Name</Label>
					<Input
						type="text"
						placeholder="New Display Name"
						onChange={(e) => setNewUsername(e.target.value)}
					/>
				</Personalization>
				<Auth>
					<h2>User Authentication</h2>
					<Label>New Email</Label>
					<Input
						type="text"
						placeholder="Enter a new email"
						onChange={(e) => setNewEmail(e.target.value)}
					/>
					<Label>New Password</Label>
					<Input type="password" placeholder="Enter a new password" />
					<Input
						type="password"
						placeholder="Confirm the new password"
						onChange={(e) => setNewPasswordConfirm(e.target.value)}
					/>
				</Auth>
				<SubmitContainer>
					<SubmitButton type="submit" disabled={err}>
						Submit
					</SubmitButton>
				</SubmitContainer>
			</Form>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	display: flex;
	justify-content: center;
	background-color: var(--background-color);
	height: calc(100vh - 85px);
`;

const Form = styled.form`
	min-width: 300px;
	width: 500px;
	padding: 40px 20px;
	background-color: white;

	border: 1px solid lightgray;
	border-top: none;
`;

const Error = styled.p`
	background-color: #ffbaba;
	color: #d8000c;
	padding: 10px;
`;

const FormSection = styled.div`
	display: flex;
	flex-direction: column;
	padding: 20px 0;
`;

const Auth = styled(FormSection)``;

const Personalization = styled(FormSection)``;

const Label = styled.label`
	margin: 5px 0;
`;

const Input = styled.input`
	margin: 5px 0;
`;

const SubmitContainer = styled.div`
	display: flex;
	flex-direction: row-reverse;
`;

const SubmitButton = styled(Button)`
	margin: 10px 0;
`;
export default EditUser;
