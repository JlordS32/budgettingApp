import { redirect } from 'react-router-dom';

// helpers
import { deleteItem } from '../utility/helpers';

// library
import { toast } from 'react-toastify';

export async function logoutAction() {
	// delete user
	deleteItem({
		key: 'userName',
	});

	toast.success("You've deleted your account!");
	//return redirect
	return redirect('/');
}
