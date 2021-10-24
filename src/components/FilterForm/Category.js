import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {useStateValue} from '../../StateProvider';
import {actionTypes} from '../../reducer'
import { useState, useEffect } from 'react';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles({products}, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(products) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}
 
  export default function Category  () {
  const theme = useTheme();
  const [categoryName, setCategory] = useState([]);
  const [{items, categoryFilter},dispatch] = useStateValue();   
  
  const category = items?.map((product) => (product.category));
  const selectCat = [...new Set(category)]; 

 
  async function handleChange(event) {
      const {
         target: { value },
      } = await event;
       setCategory(
        // On autofill we get a the stringified value.
        typeof value === 'string' ? value.split(',') : value,

  

        dispatch({
          type: actionTypes.CATEGORY_FILTER,
          categoryFilter:value,
        })

       
      );
      
    }
  
  return (
    <div>
      <FormControl sx={{ m: 1, width: 300, mt: 3 , marginTop:"15px"}}>
      
        <Select
        
          multiple
          displayEmpty
          value={categoryName}
          onChange={handleChange}
          input={<OutlinedInput />}
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <em>Select Category</em>;
            }

            return selected.join(', ');
          }}
          MenuProps={MenuProps}
          inputProps={{ 'aria-label': 'Without label' }}
        >
 
          {selectCat.map((product) => (
              
            <MenuItem
              key={product.id}
              value={product}
              style={getStyles(product, categoryName, theme)}
            >
              {product}
            </MenuItem>
          ))}
        </Select>
        
      </FormControl>
      
    </div>
  );
}
 
 



