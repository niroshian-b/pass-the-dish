import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import { db } from '../../firebase';
import { useDispatch, useSelector } from 'react-redux';

import {
	recieveRecipeDetails,
	errorRecieveRecipeDetails,
	receiveNutritionInformation,
	errorReceiveNutritionInformation,
} from '../../actions';

const RecipeDetails = () => {
	const dispatch = useDispatch();
	const { id } = useParams();

	const getRecipeDetails = async () => {
		return db
			.collection('posts')
			.doc(id)
			.get()
			.then((doc) => {
				const data = doc.data();
				dispatch(recieveRecipeDetails(id, data));
			})
			.catch((err) => {
				console.error(err);
				dispatch(errorRecieveRecipeDetails());
			});
	};

	const getNutritionalInfo = async () => {
		const ingr = recipeDetails.ingredients.map(
			(item) => `${item.qty} ${item.measurement} ${item.name}`
		);
		let prep;
		recipeDetails.recipe.forEach((step) => (prep += step));

		const body = {
			title: recipeDetails.caption,
			ingr,
			prep,
		};

		fetch('http://localhost:4000/nutritionalInfo/', {
			method: 'POST',
			body: JSON.stringify(body),
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		})
			.then((response) => response.json())
			.then((nutritonalData) => {
				const nutrition = nutritonalData.data;
				dispatch(receiveNutritionInformation(id, nutrition));
			})
			.catch((err) => {
				console.error(err);
				dispatch(errorReceiveNutritionInformation());
			});
	};

	useEffect(() => {
		getRecipeDetails();
	}, []);

	const recipeDetails = useSelector((state) => {
		return state.recipes.currentRecipe;
	});

	useEffect(() => {
		if (recipeDetails) {
			getNutritionalInfo();
		}
	}, [recipeDetails]);

	const nutritionalInfo = useSelector((state) => {
		return state.nutrition[id];
	});

	console.log(recipeDetails);
	console.log(nutritionalInfo);

	return (
		<>
			<Helmet>
				<script src="https://developer.edamam.com/attribution/badge.js"></script>
			</Helmet>
			<Wrapper>
				{recipeDetails ? (
					<Recipe>
						<RecipeCaption>{recipeDetails.caption}</RecipeCaption>
						<RecipeAuthor>{`Submitted by ${recipeDetails.username}`}</RecipeAuthor>
						<RecipeImage src={recipeDetails.imageUrl}></RecipeImage>

						{nutritionalInfo && (
							<NutritionSummary>
								<Calories>{`${nutritionalInfo.calories} Calories`}</Calories>
								<Servings>{`Estimated Servings: ${nutritionalInfo.yield}`}</Servings>
							</NutritionSummary>
						)}
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

const NutritionSummary = styled.div`
	display: flex;
	justify-content: space-between;
`;

const HealthTag = styled.div`
	background-color: black;
	color: white;
	padding: 5px;
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
