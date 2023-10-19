import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Routes
import Dashboard, {
	dashboardAction,
	dashboardLoader,
} from '../pages/Dashboard';
import Error from '../pages/Error';
import Main, { mainLoader } from '../layouts/Main';
import ExpensesPage, { expensesLoader } from '../pages/ExpensesPage';

// Library
import { ToastContainer } from 'react-toastify';

// Actions
import { logoutAction } from '../actions/logout';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Main />,
		loader: mainLoader,
    errorElement: <Error />,
		children: [
			{
				index: true,
				element: <Dashboard />,
				action: dashboardAction,
				loader: dashboardLoader,
        errorElement: <Error />,
			},
			{
				index: 'expenses',
				element: <ExpensesPage />,
				loader: expensesLoader,
			},
			{
				path: 'logout',
				action: logoutAction,
			},
		],
	},
]);

const App = () => {
	return (
		<div className='App'>
			<RouterProvider router={router} />
			<ToastContainer />
		</div>
	);
};

export default App;
