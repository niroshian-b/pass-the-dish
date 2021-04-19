import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './Contexts/AuthContext';
import { DbProvider } from './Contexts/DbContext';
import { ModalProvider } from './Contexts/ModalContext';
import App from './Components/App';

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<AuthProvider>
				<DbProvider>
					<ModalProvider>
						<App />
					</ModalProvider>
				</DbProvider>
			</AuthProvider>
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById('root')
);
