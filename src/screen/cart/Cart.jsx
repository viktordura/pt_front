import HandleUtil from '../../util/HandleUtil';
import { useFetch } from '../../hooks/useFecth';
import { useEffect, useState } from "react";

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';

const Cart = ({ setModalShow, }) => {

    const endpoint = "api/cart";
    const api        = useFetch();
    const handleUtil = HandleUtil();

    const [ data, setData ] = useState([]);

   	useEffect(() => {
		getData();
	},[])

	const getData = () => {
        handleUtil.setLoader(true);
        api.get(endpoint)
        .then(response => {
            if (response.success) {
                setData(response.data);
                handleUtil.setLoader(false);
            }
        })
        .catch(error => {
            setModalShow(false)
            handleUtil.showError(error.message);
            handleUtil.setLoader(false);
        })
    }
    
    return (
        <>
            <div className='content-rigth-modal-generic'>
            {
                data?.map((x, index) => (
                    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                        <ListItem>
                            <ListItemAvatar>
                            <Avatar>
                                <ImageIcon />
                            </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={x.name} secondary={handleUtil.formatCurrency(x.price)} />
                        </ListItem>
                    </List>
                ))
            }
                
            </div>
            <div className='footer-rigth-modal-generic'>
                <button className="button danger b-cart" type="button" onClick={() => setModalShow(false)}>
                    <span>Close</span>
                </button>
            </div>
        </>
    );
};

export default Cart;