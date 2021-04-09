import styled from 'styled-components';

const Button = styled.button`
	margin: 10px;

	height: 10%;
	width: 10%;
	max-width: 200px;
	max-height: 60px;

	background-color: var(--primary-color);
	color: var(--secondary-color);
	box-shadow: 2px 3px 5px black;

	border: transparent;
	border-radius: 15px;

	font-size: 25px;
	font-weight: bold;
`;

export default Button;
