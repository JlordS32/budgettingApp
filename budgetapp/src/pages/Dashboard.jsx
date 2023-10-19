// rrd
import { Link, useLoaderData } from 'react-router-dom';

// helpers
import {
	createBudget,
	createExpense,
	deleteItem,
	fetchData,
} from '../utility/helpers.js';

// components
import Intro from '../components/Intro.jsx';

// library
import { toast } from 'react-toastify';
import AddBudgetForm from '../components/AddBudgetForm.jsx';
import AddExpenseForm from '../components/AddExpenseForm.jsx';
import BudgetItem from '../components/BudgetItem.jsx';
import Table from '../components/Table.jsx';

export function dashboardLoader() {
	const userName = fetchData('userName');
	const budgets = fetchData('budgets');
	const expenses = fetchData('expenses');

	return {
		userName,
		budgets,
		expenses,
	};
}

export async function dashboardAction({ request }) {
	const data = await request.formData();

	const { _action, ...values } = Object.fromEntries(data);

	if (_action === 'newUser') {
		try {
			localStorage.setItem('userName', JSON.stringify(values.userName));

			return toast.success(`Welcome, ${values.userName}`);
		} catch (err) {
			const errmsg = 'There was a problem creating your account.';
			toast.error(errmsg);
			throw new Error(errmsg);
		}
	}

	if (_action === 'createBudget') {
		try {
			// create budget
			createBudget({
				name: values.newBudget,
				amount: values.newBudgetAmount,
			});

			return toast.success('Budget created!');
		} catch (err) {
			throw new Error('There was a problem creating your budget.');
		}
	}

	if (_action === 'createExpense') {
		try {
			// create an expense
			createExpense({
				name: values.newExpense,
				amount: values.newExpenseAmount,
				budgetId: values.newExpenseBudget,
			});

			return toast.success(`Expense: ${values.newExpense} created!`);
		} catch (e) {
			toast.error('There was a problem creating your expense.');
			throw new Error('There was a problem creating your expense.');
		}
	}

	if (_action === 'deleteExpense') {
		console.log(_action, values);
		
		try {
			deleteItem({
				key: 'expenses',
				id: values.expenseId,
			});

			return toast.success('Expense deleted!');
		} catch (err) {
			toast.error('There was a problem deleting your expense.');
			throw new Error('There was a problem deleting your expense.');
		}
	}
}

const Dashboard = () => {
	const { userName, budgets, expenses } = useLoaderData();

	return (
		<>
			{userName ? (
				<div className='dashboard'>
					<h1>
						Welcome back, <span className='accent'>{userName}</span>
					</h1>
					<div className='grid-sm'>
						{budgets && budgets.length > 0 ? (
							<div className='grid-lg'>
								<div className='flex-lg'>
									<AddBudgetForm />
									<AddExpenseForm budgets={budgets} />
								</div>
								<h2>Existing Budgets</h2>
								<div className='budgets'>
									{budgets.map((budget) => {
										return (
											<BudgetItem
												key={budget.id}
												budget={budget}
											/>
										);
									})}
								</div>
								{expenses && expenses.length > 0 && (
									<div className='grid-md'>
										<h2>Recent Expenses</h2>
										<Table
											expenses={expenses
												.sort((a, b) => b.createdAt - a.createdAt)
												.slice(0, 8)}
										/>

										{expenses.length > 8 && (
											<Link
												to='expenses'
												className='btn btn--dark'
											>
												View all expenses
											</Link>
										)}
									</div>
								)}
							</div>
						) : (
							<div className='grid-sm'>
								<p>Personal budgeting is the secre to financial freedom.</p>
								<p>Create a budget to get started !</p>
								<AddBudgetForm />
							</div>
						)}
					</div>
				</div>
			) : (
				<Intro />
			)}
		</>
	);
};

export default Dashboard;
