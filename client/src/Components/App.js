import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';

import GlobalStyles from '../Globals/GlobalStyles';

import Header from './Header';
import Landing from './Landing';
import HomeFeed from './HomeFeed';
import EditUser from './EditUser';
import Error from './Error';

import { useAuth } from '../Contexts/AuthContext';
import { useDb } from '../Contexts/DbContext';

function App() {
	const { currentUser } = useAuth();
	const { getUserData, setCurrentUserData } = useDb();

	useEffect(() => {
		//if the user is returning we must fetch the user's data before pushing to their home page
		if (currentUser) {
			const fetchUserData = async () => {
				const userData = await getUserData(currentUser.uid);

				setCurrentUserData(userData);
			};

			fetchUserData();
		}
	}, []);

	return (
		<>
			<GlobalStyles />
			<Header />
			<Switch>
				<Route exact path="/" component={Landing} />
				{
					/* routes meant for after logging in */
					currentUser && (
						<>
							<Route path="/home" component={HomeFeed} />
							<Route path="/edit-user" component={EditUser} />
						</>
					)
				}
				<Route path={['/error', '']} component={Error} />
			</Switch>
		</>
	);
}

export default App;
