import React from 'react';
import { Switch, Route } from 'react-router-dom';

import GlobalStyles from './Globals/GlobalStyles';

import Header from './Components/Header';
import Landing from './Components/Landing';
import Error from './Components/Error';

function App() {
	return (
		<>
			<GlobalStyles />
			<Header />
			<Switch>
				<Route exact path="/">
					<Landing />
				</Route>
				<Route path={['/error', '']}>
					<Error />
				</Route>
			</Switch>
		</>
	);
}

export default App;
