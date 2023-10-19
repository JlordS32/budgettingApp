import React from 'react';
import ExpenseItem from './ExpenseItem';

const Table = ({ expenses, showBudget = true }) => {
	return (
		<div className='table'>
			<table>
				<thead>
					<tr>
						{['Name', 'Amount', 'Date', showBudget ? 'Budget' : '', ''].map(
							(i, index) => {
								return <th key={index}>{i}</th>;
							}
						)}
					</tr>
				</thead>
				<tbody>
					{expenses.map((expense) => {
						return (
							<tr key={expense.id}>
								<ExpenseItem
									expense={expense}
									showBudget={showBudget}
								/>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};

export default Table;
