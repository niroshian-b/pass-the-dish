import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Components/App';
import { AuthProvider } from './Contexts/AuthContext';

ReactDOM.render(
	<React.StrictMode>
		<AuthProvider>
			<App />
		</AuthProvider>
	</React.StrictMode>,
	document.getElementById('root')
);
