import React, { useContext, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

import { useAuth } from '../Contexts/AuthContext';
import { ModalContext } from '../Contexts/ModalContext';

import { useHistory } from 'react-router-dom';

import Modal from './Modal';

const Landing = () => {
	const history = useHistory();
	const { currentUser } = useAuth();
	const { showModal, setShowModal } = useContext(ModalContext);

	useEffect(() => {
		if (currentUser) {
			history.push('/home');
		}
	}, [currentUser]);

	return (
		<Wrapper>
			{!showModal ? (
				<>
					<Button
						onClick={() => {
							setShowModal('register');
						}}
					>
						Register{' '}
					</Button>
					<Button
						onClick={() => {
							setShowModal('login');
						}}
					>
						Login
					</Button>
				</>
			) : (
				<Modal activeButton={showModal} />
			)}
		</Wrapper>
	);
};

const BGfade = keyframes`
    0%{
        background-image: url('../../assets/landingImages/4-by-jakub-kapusnak.jpg'), url('../../assets/landingImages/1-by-jeswin-thomas.jpg');
    }
    12% {
        background-image: url('../../assets/landingImages/1-by-jeswin-thomas.jpg'), ;
    }
    25%{
        background-image: url('../../assets/landingImages/1-by-jeswin-thomas.jpg'), url('../../assets/landingImages/2-by-jing-xi-lau.jpg');
    }
    50%{
        background-image: url('../../assets/landingImages/2-by-jing-xi-lau.jpg');
    }
    62%{
        background-image: url('../../assets/landingImages/2-by-jing-xi-lau.jpg'), url('../../assets/landingImages/3-by-spencer-davis.jpg');
    }
    75%{
        background-image: url('../../assets/landingImages/3-by-spencer-davis.jpg');
    }
    87%{
        background-image: url('../../assets/landingImages/3-by-spencer-davis.jpg'), url('../../assets/landingImages/4-by-jakub-kapusnak.jpg');
    }
    100% {
        background-image: url('../../assets/landingImages/4-by-jakub-kapusnak.jpg');
    }
`;

const Wrapper = styled.div`
	width: 100%;
	height: calc(100vh - 75px);

	background-image: url('../../assets/landingImages/4-by-jakub-kapusnak.jpg');
	background-position: center center;
	background-size: cover;
	background-repeat: no-repeat;
	backface-visibility: none;

	animation: ${BGfade} 45s linear infinite 0s;
	animation-timing-function: ease-in-out;

	display: flex;
	justify-content: center;
	align-items: center;
`;

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

export default Landing;
