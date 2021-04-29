import React from 'react';
import styled from 'styled-components';

import { useAuth } from '../Contexts/AuthContext';

import Post from './Post';

const HomeFeed = ({ posts }) => {
	const { user } = useAuth();

	return (
		<>
			<Container>
				{posts.map(({ id, post }, index) => (
					<PostWrapper>
						<Post
							key={index.toString()}
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
};

const Container = styled.div`
	background-color: var(--background-color);
`;

const PostWrapper = styled.div`
	padding: 5px;
	padding-top: 0px;
	display: flex;
	justify-content: center;
`;

export default HomeFeed;
