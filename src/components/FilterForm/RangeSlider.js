import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import {useStateValue} from '../../StateProvider';
import {actionTypes} from '../../reducer'
import { useState, useEffect } from 'react';

function valuetext(value) {
  return `${value}°C`;
}

export default function RangeSlider() {
  
  const [{items},dispatch] = useStateValue(); 
  const prices = items?.map((product) => (product.price));
  const priceMin = Math.min.apply(null, prices);
  const priceMax = Math.max.apply(null, prices);
  const  [value, setValue] = React.useState();
  const initial = [].concat(priceMin,priceMax);



  const handleChange = (event, newValue) => {
    setValue(newValue);
    dispatch({
      type: actionTypes.PRICE_FILTER,
      priceSelected:value,
    })
   
  };
  
 

  return (
    <Box sx={{ marginLeft:1 ,paddingLeft:1, marginRight:1, paddingRight:1  }}>
      <Slider
        className="Slider"
        getAriaLabel={() => 'Temperature range'}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        defaultValue={initial}
        max={priceMax}
        min={priceMin}
        
      />
    </Box>
  );
}
