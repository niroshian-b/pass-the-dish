import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';

import { ModalContext } from '../../Contexts/ModalContext';

import Register from './Register';
import Login from './Login';
const Modal = () => {
	const { showModal, setShowModal } = useContext(ModalContext);

	//function handles closing the modal when escape is pressed
	const escapeModal = (e) => {
		if ((e.charCode || e.keyCode) === 27) {
			setShowModal(null);
		}
	};

	useEffect(() => {
		document.body.addEventListener('keydown', escapeModal);

		return () => {
			document.body.removeEventListener('keydown', escapeModal);
			setShowModal(null);
		};
	});

	return (
		<Wrapper onClick={() => setShowModal(null)}>
			<Content
				onClick={(e) => {
					e.stopPropagation();
				}}
			>
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
	padding: 1.25em;
	font-size: 1.25rem;
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
	max-width: 1000px;
	min-height: 200px;
	padding: 1.25em;
	display: flex;
	flex-wrap: wrap;
	position: relative;
	z-index: 2;
`;

export default Modal;
