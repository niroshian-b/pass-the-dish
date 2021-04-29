import React, { useState, useEffect } from 'react';
import GlobalStyles from '../Global/GlobalStyles.js';
import { Switch, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { db } from '../firebase';

import Header from './Header';
import HomeFeed from './HomeFeed';
import AddRecipe from './Recipe/AddRecipe';
import EditUser from './EditUser';
import ErrorPage from './Error';
import { useAuth } from '../Contexts/AuthContext';
import RecipeDetails from './Recipe/RecipeDetails';

import { setAllRecipeDetails, setNutritionInformation } from '../actions';

const App = () => {
	const dispatch = useDispatch();
	const { user } = useAuth();

	const getAllPosts = () => {
		db.collection('posts')
			.orderBy('timestamp', 'desc')
			.onSnapshot((snapshot) => {
				const recipes = snapshot.docs.map((doc) => ({
					id: doc.id,
					post: doc.data(),
				}));

				dispatch(setAllRecipeDetails(recipes));
			});
	};

	useEffect(() => {
		getAllPosts();
	}, []);

	const posts = useSelector((state) => {
		return state.recipes;
	});

	useEffect(() => {
		if (posts) {
			posts.forEach(({ id, post }) => {
				getNutritionalInfo(post, id);
			});
		}
	}, [posts]);

	const getNutritionalInfo = async (recipeDetails, id) => {
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
				dispatch(setNutritionInformation(id, nutrition));
			})
			.catch((err) => {
				console.error(err);
			});
	};

	return (
		<>
			<GlobalStyles />
			<Header />
			<Switch>
				<Route exact path="/">
					<HomeFeed posts={posts} />
				</Route>
				<Route path="/recipeDetails/:id" component={RecipeDetails} />
				{user && (
					<>
						<Route path="/addRecipe" component={AddRecipe} />
						<Route path="/editUser" component={EditUser} />
					</>
				)}
				<Route path={['/error', '']} component={ErrorPage} />
			</Switch>
		</>
	);
};

export default App;
