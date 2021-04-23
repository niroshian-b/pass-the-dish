import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { db } from '../firebase';

const RecipeDetails = () => {
	const { id } = useParams();
	const [recipeDetails, setRecipeDetails] = useState(null);
	const [nutritionalInfo, setNutritionalInfo] = useState(null);
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

	const getNutritionalInfo = async () => {
		//[TODO] - figure out how to pass the recipe obj to the get request;
		let prep = recipeDetails.recipe.join('. ');
		let ingr = recipeDetails.ingredients.map((item) => {
			return `${item.qty} ${item.measurement} ${item.name}`;
		});
		ingr = ingr.join('!');

		const data = fetch(
			`http://localhost:4000/nutritionalInfo/${recipeDetails.caption}/${prep}/${ingr}`
		)
			.then((response) => response.json())
			.then((json) => console.log(json))
			.catch((err) => console.error(err));

		return data;
	};

	useEffect(() => {
		getRecipeDetails();
	}, []);

	useEffect(() => {
		if (recipeDetails) {
			//setNutritionalInfo(getNutritionalInfo());
		}
	}, [recipeDetails]);

	if (nutritionalInfo) {
		console.log(nutritionalInfo);
	}
	return (
		<Wrapper>
			{loading ? (
				<Recipe>
					<RecipeCaption>{recipeDetails.caption}</RecipeCaption>
					<RecipeAuthor>{`Submitted by ${recipeDetails.username}`}</RecipeAuthor>
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
							<RecipeStep key={index}>
								<Num>{`Step ${index + 1} `}</Num>
								<Step>{step}</Step>
							</RecipeStep>
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
	background-color: var(--background-color);
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

const RecipeAuthor = styled.h3`
	text-align: center;
`;

const RecipeImage = styled.img`
	width: 100%;
	object-fit: contain;
	margin: 10px auto;
`;

const RecipeIngredients = styled.ul`
	font-size: 20px;
	list-style-type: none;
`;
const RecipeItem = styled.li`
	margin: 5px 20px;
`;

const RecipeDirections = styled(RecipeIngredients)``;
const RecipeStep = styled(RecipeItem)`
	margin: 20px;
`;
const Num = styled.div`
	background-color: black;
	color: white;
	font-family: var(--heading-font);
	padding: 5px;
	display: inline-block;
`;

const Step = styled.div`
	padding: 5px;
	padding-left: 0px;
`;

export default RecipeDetails;
