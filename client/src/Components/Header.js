import React from 'react';
import styled from 'styled-components';
import { GiKnifeFork } from 'react-icons/gi';
import { useHistory } from 'react-router-dom';

const Header = () => {
	const history = useHistory();

	return (
		<Wrapper>
			<SiteName onClick={() => history.push('/')}>
				<GiKnifeFork />
				<Name>Pass the Dishes</Name>
			</SiteName>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	height: 75px;
	width: 100%;

	background-color: var(--primary-color);
	color: var(--secondary-color);

	display: flex;
	align-items: center;
`;

const Container = styled.div`
	font-size: 30px;
	margin: 10px 30px;
`;

const SiteName = styled(Container)`
	font-family: var(--heading-font);
	&:hover {
		cursor: pointer;
	}
`;

const Name = styled.span`
	margin-left: 10px;
`;

export default Header;
