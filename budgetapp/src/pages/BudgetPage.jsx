import React from 'react';

// rrd imports
import { useLoaderData } from 'react-router-dom';

// components
import BudgetItem from '../components/BudgetItem';
import AddExpenseForm from '../components/AddExpenseForm';
import Table from '../components/Table';

// helpers
import { deleteItem, getAllMatchingItems } from '../utility/helpers';
import { toast } from 'react-toastify';

// loader
export async function budgetLoader({ params }) {
	const budget = await getAllMatchingItems({
		category: 'budgets',
		key: 'id',
		value: params.id,
	})[0];

	const expenses = await getAllMatchingItems({
		category: 'expenses',
		key: 'budgetId',
		value: params.id,
	});

	if (!budget) {
		throw new Error("The budget you're trying to find doesn't exist!");
	}

	return { budget, expenses };
}

export async function budgetAction({ request }) {
	const data = await request.formData();
	const { _action, ...values } = Object.fromEntries(data);

	if (_action === 'deleteExpense') {
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

const BudgetPage = () => {
	const { budget, expenses } = useLoaderData();

	return (
		<div
			className='grid-lg'
			style={{
				'--accent': budget.color,
			}}
		>
			<h1 className='h2'>
				<span className='accent'>{budget.name} </span>
				Overview
			</h1>
			<div className='flex-lg'>
				<BudgetItem budget={budget} />
				<AddExpenseForm budgets={[budget]} />
			</div>
			{expenses && expenses.length > 0 && (
				<div className='grid-md'>
					<h2>
						<span className='accent'>{budget.name}</span>
					</h2>
					<Table
						expenses={expenses}
						showBudget={false}
					/>
				</div>
			)}
		</div>
	);
};

export default BudgetPage;