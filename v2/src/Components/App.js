import React from 'react';
import GlobalStyles from '../Global/GlobalStyles.js';
import { Switch, Route } from 'react-router-dom';

import Header from './Header';
import Landing from './Landing';
import AddRecipe from './AddRecipe';
import ErrorPage from './Error';
import { useAuth } from '../Contexts/AuthContext';
import RecipeDetails from './RecipeDetails';

const App = () => {
	const { user } = useAuth();
	return (
		<>
			<GlobalStyles />
			<Header />
			<Switch>
				<Route exact path="/" component={Landing} />
				<Route path="/recipeDetails/:id" component={RecipeDetails} />
				{user && <Route path="/addRecipe" component={AddRecipe} />}
				<Route path={['/error', '']} component={ErrorPage} />
			</Switch>
		</>
	);
};

export default App;
