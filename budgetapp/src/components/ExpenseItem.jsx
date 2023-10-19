import React from 'react';
import { formatCurrency, formatDateToLocaleString } from '../utility/helpers';

const ExpenseItem = ({ expense }) => {
	return (
		<>
			<td>{expense.name}</td>
			<td>{formatCurrency(expense.name)}</td>
			<td>{formatDateToLocaleString(expense.createAt)}</td>
		</>
	);
};

export default ExpenseItem;
