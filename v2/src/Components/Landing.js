import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import GlobalStyles from '../Global/GlobalStyles.js';

import { db } from '../firebase';
import { useAuth } from '../Contexts/AuthContext';
import { Button } from '@material-ui/core';

import Post from './Post';
import Register from './Modals/Register';
import Login from './Modals/Login';
import PostUpload from './PostUpload.js';

function Landing() {
	const [posts, setPosts] = useState([]);
	const [openLogin, setOpenLogin] = useState(false);
	const [openRegister, setOpenRegister] = useState(false);

	const { user, handleSignOut } = useAuth();

	useEffect(() => {
		db.collection('posts')
			.orderBy('timestamp', 'desc')
			.onSnapshot((snapshot) => {
				setPosts(
					snapshot.docs.map((doc) => ({
						id: doc.id,
						post: doc.data(),
					}))
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
							<>
								<h2>{user.displayName}</h2>
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
				</Header>
				{user && <PostUpload user={user} />}
				<Register open={openRegister} setOpen={setOpenRegister} />
				<Login open={openLogin} setOpen={setOpenLogin} />
				{posts.map(({ id, post }) => (
					<PostWrapper>
						<Post
							key={id}
							postId={id}
							user={user}
							username={post.username}
							caption={post.caption}
							imageUrl={post.imageUrl}
						/>
					</PostWrapper>
				))}
			</Container>
		</>
	);
}

const Container = styled.div`
	background-color: #fafafa;
`;

const Header = styled.div`
	position: sticky;
	top: 0;
	display: flex;
	align-items: center;
	justify-content: space-between;
	object-fit: contain;
	padding: 20px;
	background-color: #fafafa;
	border-bottom: 1px solid lightgray;
	z-index: 1;
`;

const HeaderLogo = styled.h1``;

const UserInfo = styled.div`
	display: flex;
`;

const PostWrapper = styled.div`
	padding: 20px;
	display: flex;
	justify-content: center;
`;

export default Landing;
