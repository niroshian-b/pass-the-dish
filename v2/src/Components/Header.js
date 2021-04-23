import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { GiKnifeFork } from 'react-icons/gi';
import { Button } from '@material-ui/core';
import { Avatar as avatar } from '@material-ui/core';
import { useAuth } from '../Contexts/AuthContext';

const Header = () => {
	const history = useHistory();
	const { user, handleSignOut, setOpenLogin, setOpenRegister } = useAuth();
	return (
		<HeaderWrapper>
			<HeaderLogo onClick={() => history.push('/')}>
				<h1>
					<GiKnifeFork />
					Pass the Dishes
				</h1>
			</HeaderLogo>

			{user && (
				<PostButton onClick={() => history.push('/addRecipe')}>
					Add New Recipe
				</PostButton>
			)}
			<UserInfo>
				{user ? (
					<>
						<Avatar
							alt={user.displayName}
							src={user.photoURL}
						></Avatar>
						<DisplayName>{user.displayName}</DisplayName>
						<Button onClick={handleSignOut}>Logout</Button>
					</>
				) : (
					<>
						<Button onClick={() => setOpenLogin(true)}>
							Login
						</Button>
						<Button onClick={() => setOpenRegister(true)}>
							Register
						</Button>
					</>
				)}
			</UserInfo>
		</HeaderWrapper>
	);
};

const HeaderWrapper = styled.div`
	position: sticky;
	top: 0;
	display: flex;
	align-items: center;
	justify-content: space-between;
	object-fit: contain;
	padding: 20px;
	background-color: white;
	border-bottom: 1px solid lightgray;
	z-index: 1;
`;

const HeaderLogo = styled.div`
	&:hover {
		cursor: pointer;
	}
`;

const UserInfo = styled.div`
	display: flex;
	align-items: center;
`;

const PostButton = styled(Button)`
	width: 100%;
	max-width: 300px;
`;
const Avatar = styled(avatar)`
	margin-right: 10px;
`;

const DisplayName = styled.h2`
	margin-right: 20px;
`;
export default Header;
