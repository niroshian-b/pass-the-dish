import React, { useState } from 'react';
import styled from 'styled-components';
import firebase from 'firebase';
import { useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { storage, db } from '../firebase';
import { useAuth } from '../Contexts/AuthContext';
import Ingredients from './Ingredients';
import Recipe from './Recipe';

const AddRecipe = () => {
	const history = useHistory();
	const { user } = useAuth();
	const [image, setImage] = useState(null);
	const [progress, setProgress] = useState(0);
	const [caption, setCaption] = useState('');
	const [ingredients, setIngredients] = useState([
		{ qty: '', measurement: '', name: '' },
	]);
	const [recipe, setRecipe] = useState(['']);

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
							ingredients,
							recipe,
						});

						//setUploadedImage(url);
						setIngredients([
							{ qty: '', measurement: '', name: '' },
						]);
						setRecipe(['']);
						setProgress(0);
						setCaption('');
						setImage(null);
						history.push('/');
					});
			}
		);
	};

	return (
		<Wrapper>
			{/* {uploadedImage && <img src={uploadedImage} alt="Uploaded Image" />} */}
			<Progress value={progress} max="100" />
			<h2>Post Image</h2>
			<input type="file" onChange={handleChange} required />
			{/* input that will be add directions to a list that will compose the recipe */}
			<Caption>
				<h2>Post Caption</h2>
				<Input
					type="text"
					placeholder="Enter a caption"
					value={caption}
					onChange={(e) => setCaption(e.target.value)}
					required
				/>
			</Caption>
			<Ingredients
				ingredients={ingredients}
				setIngredients={setIngredients}
			/>
			<Recipe recipe={recipe} setRecipe={setRecipe} />
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

const Caption = styled.div`
	padding: 10px 0;
`;

const Input = styled.input`
	width: 80%;
`;

export default AddRecipe;
