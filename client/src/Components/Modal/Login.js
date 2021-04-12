import React from 'react';
import styled from 'styled-components';

import SubmitButton from './SubmitButton';

const Login = () => {
	return (
		<Wrapper>
			<InputFields>
				<Label htmlFor="email">Email: </Label>
				<Input type="text" name="email" placeholder="email" />
				<Label htmlFor="password">Password: </Label>
				<Input type="password" name="password" placeholder="Password" />
			</InputFields>
			<SubmitButton buttonText={'Login'} />
		</Wrapper>
	);
};

const Wrapper = styled.div`
	width: 100%;
	height: 100%;
`;
const InputFields = styled.div`
	display: flex;
	flex-direction: column;
`;
const Label = styled.label`
	color: var(--primary-color);
	font-size: 20px;
	margin-top: 10px;
`;

const Input = styled.input``;

export default Login;
