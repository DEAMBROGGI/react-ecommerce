import * as React from 'react';
import Grid from '@mui/material/Grid';
import {useStateValue} from '../StateProvider';
import BuyCard from './BuyCard';
import { Typography } from '@mui/material';
import  Total  from './Total';


const BuyPage =()=>{

    const [{basket},dispatch] = useStateValue();

    function FormRow(){

        
return(
    <React.Fragment>
        {basket?.map((item)=>

            <Grid item xs={12} sm={12} md={12} lg={12} >
                <BuyCard key={item.id} product={item}/>
            </Grid>
            
        )}
</React.Fragment>
);
 }
return( 

    <Grid container spacing ={3} padding="10px">
        <Grid item xs={12}>
            <Typography align="center" gutterBottom variant="h4">
                Shopping Cart
            </Typography>
        </Grid>
        <Grid item xs={12} sm={4} md={4}  container spacing={2}>
            <FormRow/>
        </Grid>
        <Grid item xs={12} sm={8} md={8}>
            <Typography align="center" gutterBottom variant="h4">
             <Total/>
            </Typography>
        </Grid>

    </Grid>


)

}
export default BuyPage;