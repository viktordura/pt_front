import { useContext } from "react";
import { LoaderContext } from "../context/LoaderContext";
import Swal from "sweetalert2";
const HandleUtil = () => {
    
    const { setLoaderInner } = useContext(LoaderContext);

	const setLoader = (value) => {
        setLoaderInner(value);
    }

    const handlerResponse = (response) => {
        Swal.fire({
            title: '',
            text: response,
            icon: 'info'
        });
    }

    const showOk = (response) => {
        Swal.fire({
            title: '',
            text: response,
            icon: 'success'
        });
    }
    const showError = (response) => {
        Swal.fire({
            title: '',
            text: response,
            icon: 'error'
        });
    }
    
    const formatCurrency = (value) => {
        let formatting_options = {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
        }
        let val = 0;
        if(value){
            val = value;
        }
        let dollarString = new Intl.NumberFormat("en-US", formatting_options);
        return dollarString.format(val);
    }
   
    
    return {
		setLoader,
        handlerResponse,
        showError,
        showOk,
        formatCurrency
    }
}

export default HandleUtil;