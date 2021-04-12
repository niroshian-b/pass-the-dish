import React from 'react';
import styled from 'styled-components';

const Login = () => {
	return (
		<>
			<Label htmlFor="email">Email: </Label>
			<input type="text" name="email" placeholder="email" />
			<Label htmlFor="password">Password: </Label>
			<input type="password" name="password" placeholder="Password" />
			<Submit type="submit">Login</Submit>
		</>
	);
};

const Label = styled.label`
	margin-left: 15px;
`;

const Submit = styled.button`
	margin-left: 15px;
	background-color: var(--secondary-color);
	color: var(--primary-color);
	border: solid 3px transparent;
	border-radius: 4px;

	&:hover {
		background-color: var(--primary-color);
		color: var(--secondary-color);
		border: solid 3px var(--secondary-color);
	}
`;
export default Login;
