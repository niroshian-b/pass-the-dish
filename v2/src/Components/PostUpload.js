import React, { useState } from 'react';
import styled from 'styled-components';
import firebase from 'firebase';
import { Button } from '@material-ui/core';
import { storage, db } from '../firebase';

const PostUpload = ({ user }) => {
	const [image, setImage] = useState(null);
	const [progress, setProgress] = useState(0);
	const [caption, setCaption] = useState('');

	const handleChange = (e) => {
		if (e.target.files[0]) {
			setImage(e.target.files[0]);
		}
	};

	const handleUpload = (e) => {
		//Start to Upload the Image
		const uploadImage = storage.ref(`images/${image.name}`).put(image);

		//Update the progress bar
		uploadImage.on(
			'state_changed',
			(snapshot) => {
				const uploadedAmount = Math.round(
					(snapshot.bytesTrasferred / snapshot.totalBytes) * 100
				);
				setProgress(uploadedAmount);
			},
			(error) => {
				//Upload Failed
				console.log(error);
			},
			() => {
				//Upload Success!
				storage
					.ref('images')
					.child(image.name)
					.getDownloadURL()
					.then((url) => {
						db.collection('posts').add({
							timestamp: firebase.firestore.FieldValue.serverTimestamp(),
							caption: caption,
							imageUrl: url,
							username: user.displayName,
						});

						setProgress(0);
						setCaption('');
						setImage(null);
					});
			}
		);
	};

	return (
		<Wrapper>
			<Progress value={progress} max="100" />
			<input
				type="text"
				placeholder="Enter a caption"
				value={caption}
				onChange={(e) => setCaption(e.target.value)}
			/>
			<input type="file" onChange={handleChange} />
			<Button onClick={handleUpload}>Upload</Button>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	width: 60%;
	padding: 10px;
	margin: 10px auto;
	background-color: white;
`;

const Progress = styled.progress`
	width: 100%;
`;

export default PostUpload;
