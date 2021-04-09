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
        background-image: url('../../assets/landingImages/5-by-jakub-kapusnak.jpg');
    }
    20% {
        background-image: url("../../assets/landingImages/1-by-markus-winkler.jpg");
    }
    20%{
        background-image: url("../../assets/landingImages/1-by-markus-winkler.jpg");
    }
    30% {
        background-image: url('../../assets/landingImages/2-by-jeswin-thomas.jpg');
    }
    40%{
        background-image: url('../../assets/landingImages/2-by-jeswin-thomas.jpg');
    }
    50%{
        background-image: url('../../assets/landingImages/3-by-jing-xi-lau.jpg');
    }
    60%{
        background-image: url('../../assets/landingImages/3-by-jing-xi-lau.jpg');
    }
    70%{
        background-image: url('../../assets/landingImages/4-by-spencer-davis.jpg');
    }
    80%{
        background-image: url('../../assets/landingImages/4-by-spencer-davis.jpg');
    }
    100% {
        background-image: url('../../assets/landingImages/5-by-jakub-kapusnak.jpg');
    }
`;

const Wrapper = styled.div`
	width: 100vw;
	height: 100vh;

	background-image: url('../../assets/landingImages/1-by-markus-winkler.jpg');
	background-position: center center;
	background-size: cover;
	background-repeat: no-repeat;

	animation: ${BGfade} 60s linear infinite 0s;
	animation-timing-function: ease-in-out;

	display: flex;
	justify-content: center;
	align-items: center;
`;

export default Landing;
