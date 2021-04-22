import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';
const Error = () => {
	const history = useHistory();

	return (
		<Wrapper>
			<Emoji>😔</Emoji>
			<Code>Error 404</Code>
			<Message>You've taken a wrong turn</Message>
			<Button
				size="large"
				onClick={() => history.push('/')}
				color="secondary"
			>
				Back to Home
			</Button>
		</Wrapper>
	);
};
const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	text-align: center;
`;
const Emoji = styled.p`
	font-size: 15rem;
`;
const Code = styled.p`
	font-size: 7rem;
`;
const Message = styled.p`
	font-size: 5rem;
`;

export default Error;
