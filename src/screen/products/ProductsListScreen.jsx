import DataTable from "react-data-table-component";
import { useEffect, useState } from "react";
import { useFetch } from "../../hooks/useFecth";
import HandleUtil from "../../util/HandleUtil";
import TextField from '@mui/material/TextField';
import RightModal from "../../components/modal/Modal";
import Cart from "../cart/Cart";


const ProductsListScreen = ()=>{
	
	const endpoint = "api/products";
	const api = useFetch();
	const handleUtil = HandleUtil();

	const [ data, setData ] 			= useState([]);
	const [ resetPaginationToggle ] 	= useState(false);
	const [ dataFilter, setDataFilter ] = useState([]);
	const [ filterText, setFilterText ] = useState('');
	const [ textBudget, setTextBudget ] = useState('');
	const [ modalShow, setModalShow ]	= useState(false);

	useEffect(() => {
		getData();
	},[])

	const getData = () => {
        handleUtil.setLoader(true);
        api.get(endpoint)
        .then(response => {
            if (response.success) {
                setData(response.data);
                setDataFilter(response.data);
                handleUtil.setLoader(false);
            } else {
                setData([]);
                setDataFilter([]);
                handleUtil.handlerResponse(response);
                handleUtil.setLoader(false);
            }
        })
        .catch(error => {
            handleUtil.showError(error.message);
            handleUtil.setLoader(false);
        })
    }

	const handleSubmitForm = (id) => {
        handleUtil.setLoader(true);
		let body = { id: id }
        api.post('api/cart', body)
        .then(response => {
            if (response.success) {
                handleUtil.showOk(response.message);
                handleUtil.setLoader(false);
            } else {
                handleUtil.handlerResponse(response.message);
                handleUtil.setLoader(false);
            }

        })
        .catch(error => {
            handleUtil.showError(error.message);
            handleUtil.setLoader(false);
        })
    }

	const cancelSearch = () => {
        setFilterText('');
        setDataFilter(data);
    }

	const enterEvent = (e) =>{
        if (e.key === "Enter") {
            searchButton(filterText);
        }
    }

	const searchButton = (value) => {
        let filteredData = data.filter(item => 
            item.id.toString().toLowerCase().includes(value.toLowerCase())
            || item.name.toLowerCase().includes(value.toLowerCase())
            || item.price.toString().toLowerCase().includes(value.toLowerCase())
        );
        setDataFilter(filteredData);
    };


	const cancelfindBestCombination= () => {
        setTextBudget('');
        setDataFilter(data);
    }

	const findBestCombination = (products, budget) => {
		let bestCombination = [];
		let bestSum = 0;
	
		// Generate all possible combinations
		const generateCombinations = (index, currentCombination, currentSum) => {
			if (currentSum > budget) return;
	
			if (currentSum > bestSum) {
				bestSum = currentSum;
				bestCombination = [...currentCombination];
			}
	
			for (let i = index; i < products.length; i++) {
				generateCombinations(
					i + 1, 
					[...currentCombination, products[i]], 
					currentSum + products[i].price
				);
			}
		};
	
		generateCombinations(0, [], 0);
		setDataFilter(bestCombination);
		return bestCombination;
	};

	const columns = [
        {
            id: 'id',
            name: 'ID',
            selector: row => row.id,
            sortable: true
        },
        {
            id: 'name',
            name: 'Name',
			selector: row => row.name,
            sortable: true
        },
        {
            id: 'price',
            name: 'Price',
			cell: (row) => { return handleUtil.formatCurrency(row.price)},
			selector: row => row.price,
            sortable: true,
        },
		{
            id: 'add',
            name: 'Actions',
			cell: (row) => { return <button className="button success" type="button" onClick={() => handleSubmitForm(row.id)}>
										<span>Add</span>
									</button> 
			},
            sortable: true,
            width: "200px",
        }
    ];

    return(
        <div className="app container">
        
			<div className="row">
				<div className="align-items-center justify-content-end">
					<TextField
						id="outlined-basic"
						label="Enter your budget"
						variant="outlined"
						onChange={e => setTextBudget(e.target.value)}
						onKeyDown={enterEvent}
						value={textBudget}
						placeholder="search"
						size="small"
					/>
					{textBudget !== "" && (
						<button className="button danger" type="button" onClick={cancelfindBestCombination}>
							<span>Cancel</span>
						</button>
					)}
					<button className="button primary" type="button" onClick={() => findBestCombination(data, textBudget )}>
						<span>search</span>
					</button>
				</div>
			</div>

			<div className="d-flex ai-center pb-3">
				<h4 className="">
					List products
				</h4>
            </div>

			<div className="row">
				<div className="align-items-center justify-content-end content-search">
					<TextField
						id="outlined-basic"
						label="Search"
						variant="outlined"
						onChange={e => setFilterText(e.target.value)}
						onKeyDown={enterEvent}
						value={filterText}
						placeholder="search"
						size="small"
					/>
					{filterText !== "" && (
						<button className="button danger" type="button" onClick={cancelSearch}>
							<span>Cancel</span>
						</button>
					)}
					<button className="button primary" type="button" onClick={() => searchButton(filterText)}>
						<span>search</span>
					</button>
					<button className="button success" type="button" onClick={() => setModalShow(true)}>
						<span>Cart</span>
					</button>
				</div>
			</div>
			
			<div className="container-table">
				<DataTable
					columns={columns}
					data={dataFilter}
					pagination
					paginationResetDefaultPage={resetPaginationToggle}
					persistTableHead
				/>
            </div>
			<RightModal
				title={"List of products to buy "}
				visible={modalShow}
				setOptionsVisible={setModalShow}
			>
				<Cart setModalShow={setModalShow}/>
			</RightModal>
        </div>
    )
}

export default ProductsListScreen;