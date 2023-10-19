import React from 'react';
import ExpenseItem from './ExpenseItem';

const Table = ({ expenses }) => {
	return (
		<div className='table'>
			<table>
				<thead>
					<tr>
						{['Name', 'Amount', 'Data'].map((i, index) => {
							return <th key={index}>{i}</th>;
						})}
					</tr>
				</thead>
				<tbody>
					{expenses.map((expense) => {
						return (
							<tr key={expense.id}>
								<ExpenseItem expense={expense} />
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};

export default Table;
