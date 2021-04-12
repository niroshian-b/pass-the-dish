import React, { useState, useContext } from 'react';
import styled from 'styled-components';

import { CurrentUserContext } from '../../Contexts/UserContext';

import Register from './Register';
import Login from './Login';
const Modal = () => {
	const { showModal, setShowModal } = useContext(CurrentUserContext);

	return (
		<Wrapper>
			<Content>
				<Header>
					<Button
						active={showModal === 'register'}
						onClick={() => setShowModal('register')}
					>
						Register
					</Button>
					<Button
						active={showModal === 'login'}
						onClick={() => setShowModal('login')}
					>
						Login
					</Button>
				</Header>
				<Body>
					{showModal === 'login' && <Login />}
					{showModal === 'register' && <Register />}
				</Body>
				<Footer>
					<button onClick={() => setShowModal(null)}>Close</button>
				</Footer>
			</Content>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	position: fixed;
	left: 0;
	top: 0;
	right: 0;
	bottom: 0;
	background-color: rgba(0, 0, 0, 0.5);
	display: flex;
	align-items: center;
	justify-content: center;
`;
const Content = styled.div`
	width: 500px;
	background-color: #fff;
`;
const Header = styled.div``;

const Button = styled.button`
	width: 50%;
	padding: 20px;
	font-size: 20px;
	font-weight: bold;
	color: var(--primary-color);
	background-color: var(--secondary-color);
	border: none;
	border-bottom: 3px solid transparent;

	${({ active }) =>
		active &&
		`
  border-bottom: 3px solid var(--primary-color);
  `};
`;
const Body = styled.div`
	padding: 10px;
	border-top: 1px solid #eee;
`;
const Footer = styled.div``;

export default Modal;
