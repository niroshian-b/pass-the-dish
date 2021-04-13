import styled from 'styled-components';

const Button = styled.button`
	margin: 10px;

	min-height: 60px;
	min-width: 200px;

	background-color: var(--primary-color);
	color: var(--secondary-color);
	box-shadow: 2px 3px 5px black;

	border: 3px solid transparent;
	border-radius: 9px;

	font-size: 1.625rem;
	font-weight: bold;

	&:hover {
		background-color: var(--secondary-color);
		color: var(--primary-color);
		border: 3px solid var(--primary-color);
		cursor: pointer;
	}
`;

export default Button;
