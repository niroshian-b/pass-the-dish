import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { CurrentUserProvider } from './Contexts/UserContext';
import App from './App';

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<CurrentUserProvider>
				<App />
			</CurrentUserProvider>
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById('root')
);
