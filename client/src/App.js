import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import styled from 'styled-components';
import GlobalStyles from './Globals/GlobalStyles';

import Landing from './Components/Landing';
import Error from './Components/Error';

function App() {
	return (
		<BrowserRouter>
			<GlobalStyles />
			<Switch>
				<Route exact path="/">
					<Landing />
				</Route>
				<Route path={['/error', '']}>
					<Error />
				</Route>
			</Switch>
		</BrowserRouter>
	);
}

export default App;
