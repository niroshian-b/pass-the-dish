import React from 'react';
import styled from 'styled-components';

import SubmitButton from './SubmitButton';

const Login = () => {
	return (
		<Wrapper>
			<InputFields>
				<Label htmlFor="email">Email: </Label>
				<Input type="text" name="email" placeholder="Email" />
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
	font-size: 1.25rem;
	margin-top: 10px;
`;

const Input = styled.input`
	padding: 0.25em 0.75em;
	margin: 0.25em 0;
`;

export default Login;
