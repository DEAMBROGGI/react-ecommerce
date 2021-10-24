import React, { useState, useEffect } from 'react'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Product from './Product';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import usePagination from "./Pagination";


export default function Products  ({products}){


  let [page, setPage] = useState(1);
  const PER_PAGE = 6;

  const count = Math.ceil(products.length / PER_PAGE);
  const _DATA = usePagination(products, PER_PAGE);

  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };
  
  return (

<Stack spacing={2}>
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}  padding="10px"  >

          {
             _DATA.currentData().map((item)=>
                  
            <Grid item xs={12} sm={6} md={4} lg={2} display="flex" justifyContent="center" >
                <Product  key={item.id} product={item}/>
            </Grid>
                  
              )}

      </Grid>
    </Box>
    
    <Pagination  color="primary" sx={{display:"flex", justifyContent:"center"}}
          count={count}
          page={page}
          onChange={handleChange}
  
  />
    </Stack>
  );
  
}

