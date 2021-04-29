import React, { useState } from 'react';
import styled from 'styled-components';
import { Button } from '@material-ui/core';

const EditUser = () => {
	const [newImg, setNewImg] = useState(null);
	const [err, setErr] = useState(null);

	const handleChange = (e) => {
		if (e.target.files[0]) {
			//check if the file is an image file
			if (e.target.files[0]['type'].split('/')[0] === 'image') {
				setNewImg(e.target.files[0]);
				setErr(null);
			} else {
				setErr('Make sure the Display Picture is an image file');
			}
		}
	};

	console.log(newImg);

	return (
		<Wrapper>
			<Form>
				{err && <Error>{`Error: ${err}`}</Error>}
				<h1>Edit User Profile</h1>
				<Personalization>
					<h2>Personalization</h2>
					{newImg && <img></img>}
					<Label>Display Picture</Label>
					<input type="file" onChange={handleChange} />
					<Label>Display Name</Label>
					<Input type="text" placeholder="New Display Name" />
				</Personalization>
				<Auth>
					<h2>User Authentication</h2>
					<Label>New Username</Label>
					<Input type="text" placeholder="Enter a new username" />
					<Label>New Password</Label>
					<Input type="password" placeholder="Enter a new password" />
					<Input
						type="password"
						placeholder="Confirm the new password"
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
`;

const Form = styled.form`
	max-width: 700px;
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
