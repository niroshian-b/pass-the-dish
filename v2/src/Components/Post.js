import React from 'react';
import styled from 'styled-components';
import { Avatar as avatar } from '@material-ui/core';

function Post({ imageUrl, caption, handle }) {
	return (
		<Wrapper>
			{/* header -> avatar + username */}
			<PostHeader>
				<Avatar
					alt={handle}
					src="../../public/images/default-avatar-profile-icon.png"
				/>
				<h3>{handle}</h3>
			</PostHeader>

			{/* image */}
			<PostImage className="post__image" src={imageUrl}></PostImage>

			{/* username + recipe */}
			<PostCaption>
				<p>
					<strong>{handle}</strong> - {caption}
				</p>
			</PostCaption>
		</Wrapper>
	);
}

const Wrapper = styled.div`
	max-width: 500px;
	background-color: white;
	border: 1px solid lightgray;
	margin-bottom: 45px;
`;

const Avatar = styled(avatar)`
	margin-right: 10px;
`;

const PostHeader = styled.div`
	display: flex;
	align-items: center;
	padding: 20px;
`;

const PostImage = styled.img`
	width: 100%;
	object-fit: contain;
	border-top: 1px solid lightgray;
	border-bottom: 1px solid lightgray;
`;

const PostCaption = styled.div`
	padding: 20px;
`;

export default Post;
