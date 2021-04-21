import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { AuthProvider } from './Contexts/AuthContext';
import { DbProvider } from './Contexts/DbContext';
import { ModalProvider } from './Contexts/ModalContext';
import App from './Components/App';

import configureStore from './store';

const store = configureStore();

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				<AuthProvider>
					<DbProvider>
						<ModalProvider>
							<App />
						</ModalProvider>
					</DbProvider>
				</AuthProvider>
			</BrowserRouter>
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);
