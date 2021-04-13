import React from 'react';
import styled from 'styled-components';

const SubmitButton = ({ buttonText }) => {
	return (
		<Submit>
			<Button type="submit">{buttonText}</Button>
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

	font-size: 1rem;

	border: solid 3px var(--primary-color);
	border-radius: 9px;

	&:hover {
		background-color: var(--secondary-color);
		color: var(--primary-color);
		border: solid 3px var(--primary-color);
	}
`;
export default SubmitButton;