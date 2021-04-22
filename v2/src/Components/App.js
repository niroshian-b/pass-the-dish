import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import GlobalStyles from '../Global/GlobalStyles.js';

import { db } from '../firebase';
import { useAuth } from '../Contexts/AuthContext';
import { Button } from '@material-ui/core';

import Post from './Post';
import Register from './Modals/Register';
import Login from './Modals/Login';

function App() {
	const [posts, setPosts] = useState([]);
	const [openLogin, setOpenLogin] = useState(false);
	const [openRegister, setOpenRegister] = useState(false);

	const { user, handleSignOut } = useAuth();

	useEffect(() => {
		db.collection('posts').onSnapshot((snapshot) => {
			setPosts(
				snapshot.docs.map((doc) => ({ id: doc.id, post: doc.data() }))
			);
		});
	}, []);

	return (
		<>
			<GlobalStyles />
			<Container>
				<Header>
					<HeaderLogo>Pass the Dishes</HeaderLogo>
					<UserInfo>
						{user ? (
							<Button onClick={handleSignOut}>Logout</Button>
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
				</Header>
				<Register open={openRegister} setOpen={setOpenRegister} />
				<Login open={openLogin} setOpen={setOpenLogin} />
				{posts.map(({ id, post }) => (
					<Post
						key={id}
						handle={post.handle}
						caption={post.caption}
						imageUrl={post.imageUrl}
					/>
				))}
			</Container>
		</>
	);
}

const Container = styled.div`
	background-color: #fafafa;
`;

const Header = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	object-fit: contain;
	padding: 20px;
	background-color: #fafafa;
	border-bottom: 1px solid lightgray;
`;

const HeaderLogo = styled.h1``;

const UserInfo = styled.div``;

export default App;
