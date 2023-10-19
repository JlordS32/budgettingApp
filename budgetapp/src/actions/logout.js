import { redirect } from 'react-router-dom';

// helpers
import { deleteItem } from '../utility/helpers';

// library
import { toast } from 'react-toastify';

export async function logoutAction() {
	const key = ['userName', 'budgets', 'expenses'];
	// delete user
	key.forEach((item) => {
		deleteItem({
			key: item,
		});
	});

	toast.success("You've deleted your account!");
	//return redirect
	return redirect('/');
}
