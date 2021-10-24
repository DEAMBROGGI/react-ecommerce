import * as React from 'react';
import Radio from '@mui/material/Radio';
import { Typography, CardContent, Box } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import Grid from '@mui/material/Grid';
import ClearIcon from '@mui/icons-material/Clear';
import {actionTypes} from '../../reducer'
import {useStateValue} from '../../StateProvider';

export default function OrderBy() {
  
  const [selectedOrder, setSelectedOrder] = React.useState('');
  const [{value},dispatch] = useStateValue()

  const handleSelect = (event) => {
    const {
        target: { value },
      } = event;
      setSelectedOrder(value)
      dispatch({
        type: actionTypes.ORDERBY,
        orderBy:value,
      })
  };

  return (
    
    <Box > 
    <Grid container xs={12} 
        sx={{display: "flex", 
        flexDirection: "row",  
        alignItems:"center",
        justifyContent:"center"}}>
    
        <Grid item xs={6}>
            <Typography> Category </Typography>
        </Grid>
        <Grid item xs={2} 
        sx={{display: "flex", 
             justifyContent:"center"}}> 
            <ArrowUpwardIcon />
        </Grid>
        <Grid item xs={2} 
        sx={{display: "flex", 
        justifyContent:"center"}}> 
            <ArrowDownwardIcon />
        </Grid>
        <Grid item xs={2} 
        sx={{display: "flex", 
        justifyContent:"center"}}>
            <ClearIcon />
        </Grid>
    </Grid>

    <Grid container xs={12} 
        sx={{display: "flex", 
        flexDirection: "row",  
        alignItems:"center",
        justifyContent:"center"}}>
        
        <Grid  xs={6} >
            <Typography> RATING </Typography>
        </Grid>
        <Grid xs={2}
        sx={{display: "flex", 
        justifyContent:"center"}}>
            <Radio
            checked={selectedOrder === 'rating, asce'}
            onChange={handleSelect}
            value="rating, asce"
            name="radio-buttons"
            inputProps={{ 'aria-label': 'A' }}
            />
        </Grid>
        <Grid  xs={2} 
        sx={{display: "flex", 
        justifyContent:"center"}}>
            <Radio
            checked={selectedOrder === 'rating, desc'}
            onChange={handleSelect}
            value="rating, desc"
            name="radio-buttons"
            inputProps={{ 'aria-label': 'B' }}
        />
        </Grid>
        <Grid  xs={2} 
        sx={{display: "flex", 
        justifyContent:"center"}}>
            <Radio
            checked={selectedOrder === ''}
            onChange={handleSelect}
            value=""
            name="radio-buttons"
            inputProps={{ 'aria-label': 'C' }}
        />
        </Grid>
    </Grid>
    <Grid container xs={12} 
        sx={{display: "flex", 
        flexDirection: "row",  
        alignItems:"center",
        justifyContent:"center"}}>
            
        <Grid  xs={6}>
            <Typography> PRICE </Typography>
        </Grid>
        <Grid  xs={2}
        sx={{display: "flex", 
        justifyContent:"center"}}>
            <Radio
            checked={selectedOrder === 'price, asce'}
            onChange={handleSelect}
            value="price, asce"
            name="radio-buttons"
            inputProps={{ 'aria-label': 'D' }}
            />
        </Grid>
        <Grid  xs={2} 
        sx={{display: "flex", 
        justifyContent:"center"}}>
            <Radio
            checked={selectedOrder === 'price, desc'}
            onChange={handleSelect}
            value="price, desc"
            name="radio-buttons"
            inputProps={{ 'aria-label': 'E' }}
        />
        </Grid>
        <Grid  xs={2} 
        sx={{display: "flex", 
        justifyContent:"center"}}>
            <Radio
            checked={selectedOrder=== ''}
            onChange={handleSelect}
            value=""
            name="radio-buttons"
            inputProps={{ 'aria-label': 'C' }}
        />
        </Grid>
    </Grid>


</Box>

      
      
    
  );
}
