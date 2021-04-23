import React from 'react';
import GlobalStyles from '../Global/GlobalStyles.js';
import { Switch, Route } from 'react-router-dom';

import Header from './Header';
import Landing from './Landing';
import AddRecipe from './AddRecipe';
import Error from './Error';

const App = () => {
	return (
		<>
			<GlobalStyles />
			<Header />
			<Switch>
				<Route exact path="/" component={Landing} />
				<Route path="/addRecipe" component={AddRecipe} />
				<Route path={['/error', '']} component={Error} />
			</Switch>
		</>
	);
};

export default App;
