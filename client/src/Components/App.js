import React from 'react';
import { Switch, Route } from 'react-router-dom';

import GlobalStyles from '../Globals/GlobalStyles';

import Header from './Header';
import Landing from './Landing';
import HomeFeed from './HomeFeed';
import EditUser from './EditUser';
import Error from './Error';

import { useAuth } from '../Contexts/AuthContext';

function App() {
	const { currentUser } = useAuth();

	return (
		<>
			<GlobalStyles />
			<Header />
			<Switch>
				<Route exact path="/" component={Landing} />
				{currentUser && (
					<>
						<Route path="/home">
							<HomeFeed />
						</Route>
						<Route path="/edit-user" component={EditUser} />
					</>
				)}
				<Route path={['/error', '']} component={Error} />
			</Switch>
		</>
	);
}

export default App;
