import React from 'react'
import { useState } from 'react'
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {AddShoppingCart} from '@mui/icons-material';
import accounting from 'accounting';
import {createTheme, responsiveFontSizes, ThemeProvider,} from '@mui/material/styles';
import {useStateValue} from '../StateProvider'
import {actionTypes} from '../reducer'
import Box from '@mui/material/Box';
import GolfCourseIcon from '@mui/icons-material/GolfCourse';




let theme = createTheme();
theme = responsiveFontSizes(theme);

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function FilterCard({productFiltered:{

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
width,

}
}) {
  
  const [display,setDisplay] = useState("none");
  const [{basket,filterProducts },dispatch] = useStateValue();
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
    console.log(filterProducts)
  };
  const styles = {
    display:display,
  };

 

  const addToBasket = () =>{

    dispatch({
      type: actionTypes.ADD_TO_BASKET,
      item:{
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
        width,

      }
    })

  }
  
 

  return (

    
    <Card sx={{ width:"100%" }} 
        onMouseEnter={() => setDisplay("block")}
        onMouseLeave={() => setDisplay("none")}
    >
      <CardHeader
        action={
          
        <Typography
          variant='h5'
          color='textSecondary'
          >
              
          {accounting.formatMoney(price, currency)}
          </Typography>
        }
       
        subheader={featured && <GolfCourseIcon fontSize="small" color="warning"/>}
      />
      <CardMedia
        component="img"
        height="194"
        image={img}
        alt="Cuadro"
      />
      <CardContent sx={{ display:"static", heigth:"300px" }}>
      
        <Typography  variant="h6" >{name}</Typography>
      
      </CardContent>

      <CardActions  >

         <Box xs={3} sx={{
          display: 'static',
          alignItems:'flex-end',
          justifyContent:'flex-start'}}>
        <IconButton aria-label="add to Cart" onClick={addToBasket}
       >
         <AddShoppingCart 
             style={styles}
        
           />
           
        </IconButton>
        </Box>

        <Box xs={7} sx={{
        display: 'flex',
        alignItems:'flex-end',
        justifyContent:'center',
        paddingTop:"10px"
        
      }}>
        {Array(rating)
        .fill()
        .map((_,i)=>(
          <p>&#11088;</p>
        ))}

      </Box>
        <ExpandMore
          xs={2}
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
           
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>{details}</Typography>
          
         
        </CardContent>
      </Collapse>
    </Card>
    
  );
}
