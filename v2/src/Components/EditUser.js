import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { useAuth } from '../Contexts/AuthContext';
import { storage } from '../firebase';

const EditUser = () => {
	const history = useHistory();
	const { user, handleDisplayPictureChange } = useAuth();
	const [photoURL, setPhotoURL] = useState(null);
	const [newUsername, setNewUsername] = useState(null);
	const [newEmail, setNewEmail] = useState(null);
	const [newPassword, setNewPassword] = useState(null);
	const [newPasswordConfirm, setNewPasswordConfirm] = useState(null);
	const [progress, setProgress] = useState(0);
	const [err, setErr] = useState(null);

	const handleChange = (e) => {
		if (e.target.files[0]) {
			//check if the file is an image file
			if (e.target.files[0]['type'].split('/')[0] === 'image') {
				//if it is set the new image to the image
				handleDisplayPictureUpload(e.target.files[0]);
				setErr(null);
			} else {
				//if it is not display an error message
				setErr('Make sure the Display Picture is an image file');
			}
		}
	};

	const handleDisplayPictureUpload = (newImg) => {
		//Start to Upload the image
		const uploadImage = storage.ref(`images/${newImg.name}`).put(newImg);

		//Update the progress bar
		uploadImage.on(
			'state_changed',
			(snapshot) => {
				const uploadedAmount = Math.round(
					(snapshot.bytesTrasferred / snapshot.totalBytes) * 100
				);
				setProgress(uploadedAmount);
			},
			(error) => {
				//Upload Failed
				console.log(error);
			},
			() => {
				//Upload Success!
				storage
					.ref('images')
					.child(newImg.name)
					.getDownloadURL()
					.then((url) => {
						setPhotoURL(url);
						setProgress(100);
					});
			}
		);
	};
	const handleEditSubmission = async (e) => {
		e.preventDefault();
		//will change user information based on which inputs are filled
		if (newUsername !== user.displayName) {
			console.log('username changed');
		}
		if (newEmail !== user.email) {
			console.log('new email entered');
		}
		if (newPassword || newPasswordConfirm) {
			if (newPassword !== newPasswordConfirm) {
				setErr(
					'Please make sure both your password and confirmation matches'
				);
			} else {
				console.log('new password added');
			}
		}
		if (photoURL !== user.photoURL) {
			console.log('display picture changed', photoURL);
			handleDisplayPictureChange(photoURL);
		}
	};

	useEffect(() => {
		//when the edit user component is loaded, it should check if the user is logged in and then set the newData states to the user's existing data for comparison later
		if (user) {
			setNewUsername(user.displayName);
			setNewEmail(user.email);
			//password is not included for security and will require seperate reauthentaction
		}
	}, [user]);

	return (
		<Wrapper>
			<Form>
				{err && <Error>{`Error: ${err}`}</Error>}
				<h1>Edit User Profile</h1>
				<Personalization>
					<h2>Personalization</h2>
					{photoURL && <DPPreview src={photoURL} />}
					<Label>Display Picture</Label>
					{progress < 100 && <Progress value={progress} max="100" />}
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
					<Input
						type="password"
						placeholder="Enter a new password"
						onChange={(e) => setNewPassword(e.target.value)}
					/>
					<Input
						type="password"
						placeholder="Confirm the new password"
						onChange={(e) => setNewPasswordConfirm(e.target.value)}
					/>
				</Auth>
				<SubmitContainer>
					<SubmitButton
						onClick={(e) => {
							setErr(null);
							handleEditSubmission(e);
						}}
					>
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

const Progress = styled.progress`
	width: 100%;
`;

const Form = styled.form`
	min-width: 300px;
	width: 500px;
	padding: 40px 20px;
	background-color: #ffdd00;

	border: 1px solid black;
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

const DPPreview = styled.img`
	width: 40px;
	height: 40px;

	border-radius: 50%;

	display: flex;
	overflow: hidden;
	align-items: center;
	flex-shrink: 0;
	justify-content: center;
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
