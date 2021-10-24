import * as React from 'react';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { Button, CardContent, Typography, Card, CardActions } from '@mui/material';
import Box from '@mui/material/Box';
import RangeSlider from './RangeSlider';
import OrderBy from './OrderBy'
import Category from './Category';
import Grid from '@mui/material/Grid';
import Ratting from './Ratting';
import {useStateValue} from '../../StateProvider';
import {actionTypes} from '../../reducer'
import {Link} from "react-router-dom"

export default function Filtter() {

const [{items, filterProducts, ratingFilter,priceSelected,
orderBy,categoryFilter}, dispatch] =useStateValue();

const applyFilters = async (e)=> {

  const min =Math.min.apply(null,priceSelected)
  const max =Math.max.apply(null,priceSelected)
  let dataFilter = [];
  let categoria =[];
  let precio =[];
  let rating =[];

//CONDICIONAL DE FILTRADO  

  if(categoryFilter?.length >0 ){
      const cat =  categoryFilter?.map(category =>
      items.filter(items => items.category ===  category));
      categoria=cat.flat()
      dataFilter.push(categoria)
    }
    
    
  if (priceSelected.length >0){
      
      precio = 
      items?.filter(item => item.price >= min && item.price <= max);
      dataFilter.push(precio)
    };
  
    if (ratingFilter > 0  ){   
      rating = 
      items?.filter(item => item.rating <= ratingFilter );
      dataFilter.push(rating)
    };  
    
      let test = dataFilter.flat();
       //Los Arrays anidados de se unifican
      const data = categoryFilter?.map(category => test.filter(item => 
        item.rating <= ratingFilter &&
        item.price >= min && item.price <= max &&
        item.category===  category)).flat()

      let result =[]
    //Buscar duplicados por ID
    const busqueda = await data?.reduce((acc, product) => {
      acc[product.id] = ++acc[product.id] || 0;
      return acc;
    }, {});
    // Separar todos lo elementos que repiten
    const duplicados =  data?.filter( (product) => {
      return busqueda[product.id];
    });
    //Eliminar los ids repetidos y generar RESULTADO con condicional else para asegurar
    //que la pagina no quede en blanco
    if(duplicados.length >0){result =  duplicados.filter((item,index)=>{
      return duplicados.indexOf(item) === index;
      
    })

  }else{result = data.map(item=>item)};

// SE ESTABLECE SWITCH PARA ESTABLECER ORDEN DE LA BASE
  switch(orderBy.toString()){
    case "price, asce":
            result.sort(function (a, b){
            return (a.price - b.price)
          });
          break;
    case "price, desc":
            result.sort(function (a, b){
            return (b.price - a.price)
          })
          break;
    case "rating, asce":
            result.sort(function (a, b){
            return (a.rating - b.rating)
            })
          break;
    case "rating, desc":
            result.sort(function (a, b){
            return (b.rating - a.rating)
            })
          break;
    case "":
            result.sort(function (a, b){
            return (b.featured - a.featured)
            })
          break;                  
    default: return "";
      }


    //ENVIO DE RESULTADO A REDICER PARA UTILIZACION EN CONTEXTO
     dispatch({
      type: actionTypes.FILTER_PRODUCTS,
      filterProducts: result,
    });
    dispatch({
      type: actionTypes.LOAD_FILTERPAGE,
      loadFilterPage:"/filter",
    })
 
    
  }

  /*const getStyles=(name, personName, theme)=> {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }
*/

  return (
    <Box sx={{padingTop:"0px", paddingBottom:"0px"}}>
  
        <CardContent sx={{bgcolor: 'rgb(25 118 210)', 
        display: "flex", 
        flexDirection: "row",
        color:"white",  
        alignItems:"center",
        padding:"5px"
        
        }}>
   
        <Grid item xs={5} >
          <ArrowUpwardIcon fontSize= "large"/>
          <ArrowDownwardIcon fontSize= "large"/>
        </Grid>
        <Grid item sx={7}>
          <Typography fontSize= "large" >Order By</Typography>
        </Grid>
        </CardContent>

        <CardContent>
          <OrderBy/>
        </CardContent>

          <CardContent sx={{bgcolor: 'rgb(25 118 210)', 
            display: "flex", 
            flexDirection: "row",
            color:"white",  
            alignItems:"center",
            padding:"5px"
          
            }}>

          <Grid item xs={5} > 
            <FilterAltIcon fontSize= "large" />
          </Grid>
          <Grid item sx={7}>
            <Typography fontSize= "large" >Filter</Typography>
          </Grid>
          </CardContent>

           <Box sx={{paddingBottom:"0px"}}>
            
               <Typography sx={{textAlign:"center" }}>Price</Typography>
               <RangeSlider sx={{width:"100%",
                                display:"flex", 
                                flexDirection:"row", 
                                justifyContent:"center",
                               }}/>
              
            
               <Typography sx={{textAlign:"center"}}>Rating</Typography>
   
                <Ratting width="100%"
                         display="flex" 
                         flexDirection="row"
                         justifyContent="center" />
              
           
                <Category sx={{ width:"100%",
                                display:"flex", 
                                flexDirection:"row", 
                                justifyContent:"center", 
                                }}/>
              
            
                  <Box sx={{padding:"8px"}}>             
                  <Link to="/filter" style={{ textDecoration: 'none', color: "white",}}> 
                  <Button onClick={applyFilters}variant="contained" color="success" 
                          sx={{ fontSize:"large", width:"100%", }} >APPLY</Button>                      

                  </Link> 
                  </Box>                    
      </Box>
      
      </Box>
    
  );
}





  