import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const RecipeDetails = () => {
	const { id } = useParams();

	const recipeDetails = useSelector((state) => {
		return state.recipes.find((recipe) => recipe.id === id);
	});

	const nutritionalInfo = useSelector((state) => {
		return state.nutrition[id];
	});

	console.log(nutritionalInfo);
	return (
		<>
			<Helmet>
				<script src="https://developer.edamam.com/attribution/badge.js"></script>
			</Helmet>
			<Wrapper>
				{recipeDetails ? (
					<Recipe>
						<RecipeCaption>
							{recipeDetails.post.caption}
						</RecipeCaption>
						<RecipeAuthor>{`Submitted by ${recipeDetails.post.username}`}</RecipeAuthor>
						<RecipeImage
							src={recipeDetails.post.imageUrl}
						></RecipeImage>

						{nutritionalInfo && (
							<>
								<NutritionSummary>
									<Calories>{`${Math.round(
										nutritionalInfo.calories /
											nutritionalInfo.yield
									)} Calories per Serving!`}</Calories>
									<Servings>{`Estimated Servings: ${nutritionalInfo.yield}`}</Servings>
								</NutritionSummary>
								<h3>Health Labels</h3>
								<NutritionTags>
									{nutritionalInfo.healthLabels.map(
										(label, index) => (
											<HealthTag key={index}>
												{label.replace(/_/g, ' ')}
											</HealthTag>
										)
									)}
								</NutritionTags>
							</>
						)}
						<RecipeIngredients>
							<h3>Ingredients</h3>
							{recipeDetails.post.ingredients.map(
								(item, index) => (
									<RecipeItem
										key={index}
									>{`${item.qty} ${item.measurement} ${item.name}`}</RecipeItem>
								)
							)}
						</RecipeIngredients>

						<RecipeDirections>
							<h3>Directions</h3>
							{recipeDetails.post.recipe.map((step, index) => (
								<RecipeStep key={index}>
									<Num>{`☑ Step ${index + 1} `}</Num>
									<Step>{step}</Step>
								</RecipeStep>
							))}
						</RecipeDirections>
					</Recipe>
				) : (
					<h2>loading</h2>
				)}
				<div id="edamam-badge" data-color="white"></div>
			</Wrapper>
		</>
	);
};

const Wrapper = styled.div`
	display: flex;
	justify-content: center;
	background-color: var(--background-color);
`;
const Recipe = styled.div`
	max-width: 900px;
	padding: 40px 20px;
	background-color: #ffdd00;
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

const NutritionSummary = styled.div`
	display: flex;
	justify-content: space-between;
`;

const NutritionTags = styled.div`
	display: flex;
	flex-wrap: wrap;
`;

const HealthTag = styled.div`
	background-color: black;
	color: white;
	padding: 5px;
	margin: 5px;
	border-radius: 8px;
`;

const Calories = styled(HealthTag)``;
const Servings = styled(HealthTag)``;

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
