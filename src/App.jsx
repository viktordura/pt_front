import './App.css';
import './assets/css/style.css';
import Loader from './components/loader/Loader';
import ProductsListScreen from './screen/products/ProductsListScreen';
import { useContext } from "react";
import { LoaderContext } from './context/LoaderContext';

function App() {

	const {loader} = useContext(LoaderContext);

	return (
		<>
			{loader && <Loader />}  
			<ProductsListScreen />
		</>
	);
}

export default App;
