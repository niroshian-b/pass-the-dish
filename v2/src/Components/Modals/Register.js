import React from 'react';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button, Input } from '@material-ui/core';
import { useAuth } from '../../Contexts/AuthContext';

function getModalStyle() {
	const top = 50;
	const left = 50;

	return {
		top: `${top}%`,
		left: `${left}%`,
		transform: `translate(-${top}%, -${left}%)`,
	};
}

const useStyles = makeStyles((theme) => ({
	paper: {
		position: 'absolute',
		width: 400,
		backgroundColor: theme.palette.background.paper,
		border: '2px solid #000',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
	},
}));

export default function Register({ open, setOpen }) {
	const [modalStyle] = React.useState(getModalStyle);
	const classes = useStyles();
	const {
		username,
		setUsername,
		email,
		setEmail,
		password,
		setPassword,
		handleSignUp,
	} = useAuth();

	return (
		<Modal open={open} onClose={() => setOpen(false)}>
			<div style={modalStyle} className={classes.paper}>
				<Form>
					<center>
						<h3>Register</h3>
					</center>
					<Input
						type="text"
						placeholder="Username"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					></Input>
					<Input
						type="email"
						placeholder="Email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					></Input>
					<Input
						type="password"
						placeholder="Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					></Input>
					<Button
						type="submit"
						onClick={(e) => {
							handleSignUp(e);
							setOpen(false);
						}}
					>
						Sign Up
					</Button>
				</Form>
			</div>
		</Modal>
	);
}

const Form = styled.form`
	display: flex;
	flex-direction: column;
`;
