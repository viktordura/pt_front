
import router from './router/Router';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router';
import { LoaderContextProvider } from './context/LoaderContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<LoaderContextProvider>
		<RouterProvider router={router} />
	</LoaderContextProvider>
);

