import React, { useState, useEffect } from 'react'
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import accounting from 'accounting';
import {createTheme, responsiveFontSizes, ThemeProvider,} from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import {useStateValue} from '../StateProvider';
import {actionTypes} from '../reducer'


let theme = createTheme(); 
theme = responsiveFontSizes(theme);

export default function BuyCart({product:{
id,
name,
price,
currency,
img,
details,
bestseller,
category,
featured,
rating,
height,
width
}
}) {
  
const [{basket},dispatch] = useStateValue();

const removeItem = ()=> dispatch({

  type: actionTypes.REMOVE_ITEM,
  id: id,

})

  return (
    <Card  sx={{ width:"100%"  }}>
      <CardHeader
        
        action={
          <Typography
        
          variant='h5'
          color='textSecondary'
          >
              
          {accounting.formatMoney(price, currency)}
          </Typography>
        }
       
        subheader={featured}
      />
      <CardMedia
        component="img"
        height="194"
        image={img}
        alt="Cuadro"
      />
      <CardContent>
      <ThemeProvider theme={theme}>
        <Typography  variant="h5" sx={{fontSize:"vmax"}}>{name}</Typography>
      </ThemeProvider>
      </CardContent>
      <CardActions disableSpacing sx={{display:"flex" ,justifyContent:"space-between", textAlign:"center"}}>
      <Typography  display="flex" >
        {Array(rating)
        .fill()
        .map((_,i)=>(
          <p>&#11088;</p>
        ))}
        </Typography>
        <IconButton>
        <DeleteIcon fontSize="large" onClick={removeItem}/>
        </IconButton>
      </CardActions>
      
    </Card>
  );
}
