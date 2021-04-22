import React, { useState } from 'react';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button, Input } from '@material-ui/core';
import { useAuth } from '../../Contexts/AuthContext';
import ForgotPassword from './ForgotPassword';

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

export default function Login({ open, setOpen }) {
	const [modalStyle] = React.useState(getModalStyle);
	const classes = useStyles();
	const { email, setEmail, password, setPassword, handleSignIn } = useAuth();
	const [forgotPassword, setForgotPassword] = useState(false);

	return (
		<>
			{forgotPassword ? (
				<ForgotPassword
					open={forgotPassword}
					setOpen={setForgotPassword}
				/>
			) : (
				<Modal open={open} onClose={() => setOpen(false)}>
					<div style={modalStyle} className={classes.paper}>
						<Form>
							<center>
								<h3>Login</h3>
							</center>
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
									handleSignIn(e);
									setOpen(false);
								}}
							>
								Sign In
							</Button>
						</Form>

						<ResetPassword
							onClick={() => {
								setForgotPassword(true);
							}}
						>
							Forgot Password?
						</ResetPassword>
					</div>
				</Modal>
			)}
		</>
	);
}

const Form = styled.form`
	display: flex;
	flex-direction: column;
	margin-bottom: 20px;
`;

const ResetPassword = styled(Button)`
	width: 100%;
`;
