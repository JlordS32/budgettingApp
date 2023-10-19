import { fetchData } from '../utility/helpers.js';
import { Outlet, useLoaderData } from 'react-router-dom';

// assets
import wave from '../assets/wave.svg';
import Nav from '../components/Nav.jsx';

// library
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

export function mainLoader() {
	const userName = fetchData('userName');

	return {
		userName,
	};
}

const Main = () => {
	const { userName } = useLoaderData();

	return (
		<div className='layout'>
			<Nav userName={userName} />
			<main>
				<Outlet />
			</main>
			<img
				src={wave}
				alt='wave svg'
			/>
		</div>
	);
};

export default Main;
