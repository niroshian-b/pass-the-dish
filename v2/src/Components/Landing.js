import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { db } from '../firebase';
import { useAuth } from '../Contexts/AuthContext';

import Post from './Post';
function Landing() {
	const [posts, setPosts] = useState([]);

	const { user } = useAuth();

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
			<Container>
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
	background-color: var(--background-color);
`;

const PostWrapper = styled.div`
	padding: 5px;
	padding-top: 0px;
	display: flex;
	justify-content: center;
`;

export default Landing;
