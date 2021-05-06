import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import firebase from 'firebase';
import moment from 'moment';
import { Avatar as avatar } from '@material-ui/core';
import { db } from '../firebase';
import { useHistory } from 'react-router-dom';

function Post({ postId, user, username, imageUrl, caption }) {
	const history = useHistory();
	const [comments, setComments] = useState([]);
	const [newComment, setNewComment] = useState('');

	useEffect(() => {
		let unsubscribe;
		if (postId) {
			unsubscribe = db
				.collection('posts')
				.doc(postId)
				.collection('comments')
				.orderBy('timestamp')
				.onSnapshot((snapshot) => {
					setComments(
						snapshot.docs.map((doc) => ({
							id: doc.id,
							comment: doc.data(),
						}))
					);
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

		setNewComment('');
	};

	return (
		<Wrapper>
			<PostHeader>
				<Avatar
					alt={username}
					src="../../public/images/default-avatar-profile-icon.png"
				/>
				<h3>{username}</h3>

				{user && user.displayName === username && (
					<EditButton>Edit</EditButton>
				)}
			</PostHeader>

			<PostImage
				src={imageUrl}
				onClick={() => history.push(`/recipeDetails/${postId}`)}
			></PostImage>

			<PostCaption>
				<Caption>
					<strong>{username}</strong> - {caption}
				</Caption>
			</PostCaption>
			{comments.length > 0 && (
				<PostComments>
					{comments.map(({ id, comment }) => {
						return (
							<Comment key={id}>
								<p>
									<strong>{comment.username}</strong>{' '}
									{comment.text}
								</p>
								<Time>
									{comment.timestamp &&
										`${moment().from(
											comment.timestamp.toDate(),
											true
										)} ago`}
								</Time>
							</Comment>
						);
					})}
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
	background-color: #ffdd00;
	border: 5px solid black;
	margin-bottom: 20px;
`;

const Avatar = styled(avatar)`
	margin-right: 10px;
	color: black;
`;

const PostHeader = styled.div`
	display: flex;
	align-items: center;
	padding: 20px;
`;

const PostImage = styled.img`
	width: 100%;
	object-fit: contain;
	border-top: 3px solid black;
	border-bottom: 3px solid black;

	&:hover {
		cursor: pointer;
	}
`;

const PostCaption = styled.div`
	padding: 10px 20px;
	border-bottom: 1px solid black;
`;

const Caption = styled.p`
	font-size: 18px;
`;

const PostComments = styled.div`
	padding: 20px;
`;

const Comment = styled.div`
	font-size: 14px;
`;

const Time = styled.p`
	font-size: 10px;
	text-align: right;
`;

const Form = styled.form`
	display: flex;
	margin-top: 10px;
`;

const Input = styled.input`
	flex: 1;
	padding: 10px;
	border: none;
`;

const Button = styled.button`
	flex: 0;
	border: none;
	color: black;
	padding: 10px 20px;

	&:hover {
		background-color: black;
		color: white;
	}
`;
const EditButton = styled(Button)`
	margin-left: auto;
`;

export default Post;
