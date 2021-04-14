import React from 'react';
import styled from 'styled-components';

const SubmitButton = ({ disabled, buttonText }) => {
	return (
		<Submit>
			<Button disabled={disabled} type="submit">
				{buttonText}
			</Button>
		</Submit>
	);
};

const Submit = styled.div`
	display: flex;
	flex-direction: row-reverse;
	align-items: flex-end;
`;
const Button = styled.button`
	background-color: var(--primary-color);
	color: var(--secondary-color);

	min-height: 40px;
	min-width: 70px;

	margin-top: 1.25rem;

	font-size: 1rem;

	border: solid 3px var(--primary-color);
	border-radius: 9px;

	&:hover {
		background-color: var(--secondary-color);
		color: var(--primary-color);
		border: solid 3px var(--primary-color);
	}

	&:disabled {
		border: 3px solid #999999;
		background-color: #cccccc;
		color: #666666;
	}
`;
export default SubmitButton;
