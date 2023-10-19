import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Routes
import Dashboard, {
	dashboardAction,
	dashboardLoader,
} from '../pages/Dashboard';
import Error from '../pages/Error';
import Main, { mainLoader } from '../layouts/Main';
import ExpensesPage, {
	expensesAction,
	expensesLoader,
} from '../pages/ExpensesPage';

// Library
import { ToastContainer } from 'react-toastify';

// Actions
import { logoutAction } from '../actions/logout';
import BudgetPage, { budgetAction, budgetLoader } from '../pages/BudgetPage';

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
				path: 'budget/:id',
				element: <BudgetPage />,
				loader: budgetLoader,
				action: budgetAction,
				errorElement: <Error />,
			},
			{
				path: 'expenses',
				element: <ExpensesPage />,
				loader: expensesLoader,
				action: expensesAction,
				errorElement: <Error />,
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
