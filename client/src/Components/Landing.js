import React from 'react';
import styled, { keyframes } from 'styled-components';

import Button from './Button';

const Landing = () => {
	return (
		<Wrapper>
			<Button>Register</Button>
			<Button>Log In</Button>
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
	width: 100vw;
	height: 100vh;

	background-image: url('../../assets/landingImages/4-by-jakub-kapusnak.jpg');
	background-position: center center;
	background-size: cover;
	background-repeat: no-repeat;
	backface-visibility: none;

	animation: ${BGfade} 30s linear infinite 0s;
	animation-timing-function: ease-in-out;

	display: flex;
	justify-content: center;
	align-items: center;
`;

export default Landing;
