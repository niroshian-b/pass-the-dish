import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { db } from '../firebase';

const RecipeDetails = () => {
	const { id } = useParams();
	const [recipeDetails, setRecipeDetails] = useState([]);
	const [loading, setLoading] = useState(false);

	const getRecipeDetails = async () => {
		return db
			.collection('posts')
			.doc(id)
			.get()
			.then((doc) => {
				setRecipeDetails(doc.data());
				setLoading(true);
			});
	};

	useEffect(() => {
		getRecipeDetails();
	}, []);

	console.log(recipeDetails);
	return (
		<Wrapper>
			{loading ? (
				<Recipe>
					<RecipeCaption>{recipeDetails.caption}</RecipeCaption>

					<RecipeImage src={recipeDetails.imageUrl}></RecipeImage>

					<RecipeIngredients>
						<h3>Ingredients</h3>
						{recipeDetails.ingredients.map((item, index) => (
							<RecipeItem
								key={index}
							>{`${item.qty} ${item.measurement} ${item.name}`}</RecipeItem>
						))}
					</RecipeIngredients>

					<RecipeDirections>
						<h3>Directions</h3>
						{recipeDetails.recipe.map((step, index) => (
							<RecipeStep key={index}>{step}</RecipeStep>
						))}
					</RecipeDirections>
				</Recipe>
			) : (
				<h2>loading</h2>
			)}
		</Wrapper>
	);
};

const Wrapper = styled.div`
	display: flex;
	justify-content: center;
	background-color: #fafafa;
`;
const Recipe = styled.div`
	max-width: 700px;
	padding: 40px 20px;
	background-color: white;

	border: 1px solid lightgray;
	border-top: none;
`;
const RecipeCaption = styled.h2`
	text-align: center;
`;
const RecipeImage = styled.img`
	width: 100%;
	object-fit: contain;
	margin: 10px auto;
`;

const RecipeIngredients = styled.ul`
	font-size: 20px;
`;
const RecipeItem = styled.li`
	margin: 5px 40px;
`;

const RecipeDirections = styled(RecipeIngredients)``;
const RecipeStep = styled(RecipeItem)`
	margin: 20px;
`;
export default RecipeDetails;
