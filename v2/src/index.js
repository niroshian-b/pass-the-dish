import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';

import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './Contexts/AuthContext';
import { StylesProvider } from '@material-ui/core/styles';

import configureStore from './store';

import App from './Components/App';

const store = configureStore();

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				<AuthProvider>
					<StylesProvider injectFirst>
						<App />
					</StylesProvider>
				</AuthProvider>
			</BrowserRouter>
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);
