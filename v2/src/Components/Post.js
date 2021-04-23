import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import firebase from 'firebase';
import { Avatar as avatar } from '@material-ui/core';
import { db } from '../firebase';

function Post({ postId, user, username, imageUrl, caption }) {
	const [comments, setComments] = useState([]);
	const [newComment, setNewComment] = useState('');

	useEffect(() => {
		let unsubscribe;
		if (postId) {
			unsubscribe = db
				.collection('posts')
				.doc(postId)
				.collection('comments')
				.onSnapshot((snapshot) => {
					setComments(snapshot.docs.map((doc) => doc.data()));
				});
		}

		return () => {
			unsubscribe();
		};
	}, [postId]);

	const postComment = (e) => {
		e.preventDefault();
		db.collection('posts').doc(postId).collection('comments').add({
			text: newComment,
			username: user.displayName,
			timestamp: firebase.firestore.FieldValue.serverTimestamp(),
		});
	};

	return (
		<Wrapper>
			{/* header -> avatar + username */}
			<PostHeader>
				<Avatar
					alt={username}
					src="../../public/images/default-avatar-profile-icon.png"
				/>
				<h3>{username}</h3>
			</PostHeader>

			{/* image */}
			<PostImage className="post__image" src={imageUrl}></PostImage>

			{/* username + recipe */}
			<PostCaption>
				<Caption>
					<strong>{username}</strong> - {caption}
				</Caption>
			</PostCaption>
			{comments.length > 0 && (
				<PostComments>
					{comments.map((comment) => (
						<Comment>
							<strong>{comment.username}</strong> {comment.text}
						</Comment>
					))}
				</PostComments>
			)}
			{user && (
				<Form>
					<Input
						type="text"
						placeholder="Leave a comment"
						value={newComment}
						onChange={(e) => setNewComment(e.target.value)}
					/>
					<Button
						type="submit"
						disabled={!newComment}
						onClick={postComment}
					>
						Post
					</Button>
				</Form>
			)}
		</Wrapper>
	);
}

const Wrapper = styled.div`
	max-width: 500px;
	background-color: white;
	border: 1px solid lightgray;
	margin-bottom: 20px;
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
	padding: 10px 20px;
`;

const Caption = styled.p`
	font-size: 18px;
`;

const PostComments = styled.div`
	padding: 20px;
`;

const Comment = styled.p`
	font-size: 14px;
`;

const Form = styled.form`
	display: flex;
	margin-top: 10px;
`;

const Input = styled.input`
	flex: 1;
	padding: 10px;
	border: none;
	border-top: 1px solid lightgrey;
`;

const Button = styled.button`
	flex: 0;
	border: none;
	color: #6082a3;
	padding: 10px;
`;

export default Post;
