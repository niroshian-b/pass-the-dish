import React from 'react';
import styled from 'styled-components';

const BaseButton = ({ disabled, onClick, children }) => {
	return (
		<Button disabled={disabled} onClick={onClick}>
			{children}
		</Button>
	);
};

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
`;

export default BaseButton;