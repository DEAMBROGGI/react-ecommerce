import React from 'react';
import accounting from 'accounting';
import { Button } from '@mui/material';
import { CardContent } from '@mui/material';
import {useStateValue} from '../StateProvider';
import {actionTypes} from '../reducer';
import {getTotal} from '../reducer';
import {Link} from "react-router-dom"

 const Total = () => {

    const [{basket},dispatch] = useStateValue();

    const clearShoppingCart = ()=> dispatch({

        type: actionTypes.CLEAR_SHOPPING_CART,
        
      })
      
    return (
        <CardContent sx={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center",height:"20vh"}} >
            <h5>Total Items: {basket?.length}</h5>
            {accounting.formatMoney(getTotal(basket),"USD ")}
            <Link to="/check-out" style={{ textDecoration: 'none',width:"100%" }}>
            <Button variant="contained" color="success" sx={{marginTop:"2rem", fontSize:"large", width:"100%"}} >CheckOUT</Button>
            </Link>
            <Button onClick={clearShoppingCart}variant="contained" color="error" sx={{marginTop:"1rem", fontSize:"large", width:"100%"}} >CLEAR</Button>
        </CardContent>
    )
}
export default Total;