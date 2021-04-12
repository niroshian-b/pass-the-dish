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
export default SubmitButton;
