import * as React from 'react';
import Grid from '@mui/material/Grid';
import {useStateValue} from '../StateProvider';
import FilterCard from './FilterCard';
import { Typography } from '@mui/material';
import  Total  from './Total';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import usePaginationFilter from "./PaginationFilter";
import { useState, useEffect} from 'react';
import Box from '@mui/material/Box';

 const FilterPage = ()=>{

    const [{filterProducts},dispatch] = useStateValue();
    let [page, setPage] = useState(1);
    const PER_PAGE = 6;
    const count = Math.ceil(filterProducts?.length / PER_PAGE);
    const _DATA =  usePaginationFilter(filterProducts, PER_PAGE);

    const handleChange = (e, p) => { 
      setPage(p);
      _DATA.jump(p);
    };

     function FormFilterRow(){
  
      return(
          <React.Fragment>
              {  _DATA?.currentData().map((item)=>
                    
                    <Grid item xs={12} sm={6} md={4} lg={2} display="flex" justifyContent="center" >
                        <FilterCard  key={item.id} productFiltered={item}/>
                    </Grid> 
                    )}
      </React.Fragment>
      );
       }





    
    return (
      
  <Stack spacing={2}>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}  padding="10px"  >
  
            
               
        <FormFilterRow/>       
              
  
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
  export default FilterPage;