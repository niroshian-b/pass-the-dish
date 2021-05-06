import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { GiKnifeFork } from 'react-icons/gi';
import { Avatar as avatar, Button, withStyles } from '@material-ui/core';
import { useAuth } from '../Contexts/AuthContext';
import Register from './Modals/Register';
import Login from './Modals/Login';

const Header = () => {
	const history = useHistory();
	const {
		user,
		handleSignOut,
		openRegister,
		setOpenRegister,
		openLogin,
		setOpenLogin,
	} = useAuth();
	return (
		<>
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
							<User onClick={() => history.push('/editUser')}>
								<Avatar
									alt={user.displayName}
									src={user.photoURL}
								></Avatar>
								<DisplayName>{user.displayName}</DisplayName>
							</User>
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
			<Register open={openRegister} setOpen={setOpenRegister} />
			<Login open={openLogin} setOpen={setOpenLogin} />
		</>
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
	background-color: #ffdd00;
	border-bottom: 1px solid black;
	z-index: 1;
`;

const HeaderLogo = styled.div`
	&:hover {
		cursor: pointer;
	}
	@media (max-width: 767px) {
		font-size: 10px;
	}
`;

const UserInfo = styled.div`
	display: flex;
	align-items: center;
`;

const User = styled.div`
	display: flex;
	align-items: center;

	&:hover {
		cursor: pointer;
	}
`;

const PostButton = styled(Button)`
	width: 100%;
	max-width: 300px;

	&:hover {
		font-weight: bold;
	}
`;

const Avatar = withStyles({ root: { 'margin-right': '10px', color: 'black' } })(
	avatar
);

const DisplayName = styled.h2`
	margin-right: 20px;
	@media (max-width: 767px) {
		font-size: 20px;
	}
`;
export default Header;
