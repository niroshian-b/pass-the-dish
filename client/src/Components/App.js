import React from 'react';
import { Switch, Route } from 'react-router-dom';

import GlobalStyles from '../Globals/GlobalStyles';

import Header from './Header';
import Landing from './Landing';
import Error from './Error';

function App() {
	return (
		<>
			<GlobalStyles />
			<Header />
			<Switch>
				<Route exact path="/" component={Landing} />
				<Route path={['/error', '']} component={Error} />
			</Switch>
		</>
	);
}

export default App;
