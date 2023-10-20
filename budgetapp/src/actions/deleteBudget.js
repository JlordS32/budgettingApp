import { toast } from 'react-toastify';
import { deleteItem, getAllMatchingItems } from '../utility/helpers';
import { redirect } from 'react-router-dom';

export const deleteBudget = ({ params }) => {
	try {
		deleteItem({
			key: 'budgets',
			id: params.id,
		});

		const associatedExpenses = getAllMatchingItems({
			category: 'expenses',
			key: 'budgetId',
			value: params.id,
		});

		associatedExpenses.forEach((expense) => {
			deleteItem({
				key: 'expenses',
				id: expense.id,
			});
		});

		toast.success('Budget deleted successfully!');
	} catch (err) {
		toast.error('There was a problem deleting your budget.');
		throw new Error('There was a problem deleting your budget.');
	}

	return redirect('/');
};
