import React, { useState } from 'react';
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

export default function ForgotPassword({ open, setOpen }) {
	const [modalStyle] = React.useState(getModalStyle);
	const classes = useStyles();
	const { email, setEmail, handlePasswordReset } = useAuth();
	const [emailSent, setEmailSent] = useState(false);

	return (
		<Modal
			open={open}
			onClose={() => {
				setOpen(false);
				setEmailSent(false);
			}}
		>
			<div style={modalStyle} className={classes.paper}>
				{!emailSent ? (
					<>
						<Form>
							<center>
								<h3>Forgot Password</h3>
							</center>
							<Input
								type="email"
								placeholder="Email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							></Input>
							<Button
								type="submit"
								onClick={(e) => {
									handlePasswordReset(e);
									setEmailSent(true);
								}}
							>
								Confirm Email
							</Button>
						</Form>
					</>
				) : (
					<PasswordResetResponse>
						Check the provided email for instructions regarding
						resetting your password
					</PasswordResetResponse>
				)}
			</div>
		</Modal>
	);
}

const Form = styled.form`
	display: flex;
	flex-direction: column;
`;

const PasswordResetResponse = styled.h3`
	display: flex;
	align-items: center;
	justify-content: center;
`;
