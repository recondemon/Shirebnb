import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import './index.css';
import configureStore from './store';
import { restoreCSRF, csrfFetch } from './store/csrf';
import * as sessionActions from './store/session';
import { BrowserRouter } from 'react-router-dom';

const store = configureStore();
if (import.meta.env.MODE !== 'production') {
	restoreCSRF();

	window.csrfFetch = csrfFetch;
	window.store = store;
	window.sessionActions = sessionActions;
}

console.log(window.store); // Should output the Redux store
console.log(window.sessionActions); // Should output the session actions

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</Provider>
	</React.StrictMode>
);
