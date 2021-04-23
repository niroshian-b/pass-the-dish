import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import firebase from 'firebase';
import { Button } from '@material-ui/core';
import { storage, db } from '../firebase';
import { useAuth } from '../Contexts/AuthContext';

const AddRecipe = () => {
	const { user } = useAuth();
	const [image, setImage] = useState(null);
	const [progress, setProgress] = useState(0);
	const [caption, setCaption] = useState('');
	const [recipe, setRecipe] = useState(['']);
	//const [uploadedImage, setUploadedImage] = useState(null);

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

						//setUploadedImage(url);
						setProgress(0);
						setCaption('');
						setImage(null);
					});
			}
		);
	};

	// useEffect(() => {
	// return () => {
	// setUploadedImage(null);
	// };
	// }, []);

	return (
		<Wrapper>
			{/* {uploadedImage && <img src={uploadedImage} alt="Uploaded Image" />} */}
			<Progress value={progress} max="100" />
			<h2>Post Image</h2>
			<input type="file" onChange={handleChange} />
			{/* input that will be add directions to a list that will compose the recipe */}
			<h2>Post Caption</h2>
			<input
				type="text"
				placeholder="Enter a caption"
				value={caption}
				onChange={(e) => setCaption(e.target.value)}
			/>
			<h2>Recipe</h2>
			{recipe.forEach((step) => {
				<div>
					<input type="text" placeholder="Step" />
					<button
						onClick={() => {
							let newRecipe = recipe.push('');
							setRecipe(newRecipe);
						}}
					>
						➕
					</button>
				</div>;
			})}
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

export default AddRecipe;
