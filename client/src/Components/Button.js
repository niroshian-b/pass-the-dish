import styled from 'styled-components';

const Button = styled.button`
	margin: 10px;

	height: 10%;
	min-width: 200px;
	max-height: 60px;

	background-color: var(--primary-color);
	color: var(--secondary-color);
	box-shadow: 2px 3px 5px black;

	border: 3px solid transparent;
	border-radius: 15px;

	font-size: 25px;
	font-weight: bold;

	&:hover {
		background-color: var(--secondary-color);
		color: var(--primary-color);
		border: 3px solid var(--primary-color);
		cursor: pointer;
	}
`;

export default Button;
