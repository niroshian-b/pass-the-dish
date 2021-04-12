import React, { useContext } from 'react';
import styled, { keyframes } from 'styled-components';

import Button from './Button';
import Modal from './Modal';

import { CurrentUserContext } from '../Contexts/UserContext';

const Landing = () => {
	const { showModal, setShowModal } = useContext(CurrentUserContext);
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

export default Landing;
