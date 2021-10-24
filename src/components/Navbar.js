
import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCart  from '@mui/icons-material/ShoppingCart';
import MoreIcon from '@mui/icons-material/MoreVert';
import logo from "../img/amdev.svg"
import {Link} from "react-router-dom"
import {useStateValue} from '../StateProvider';
import { auth } from './Firebase';
import { actionTypes } from '../reducer';
import {useHistory} from 'react-router-dom'
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Filtter from "./FilterForm/Filtter";

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function Navbar({products}) {
  const history = useHistory();
  const [{basket, user,filterProducts, loadFilterPage},dispatch] = useStateValue();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [filterAnchorEl, setFilterAnchorEl] = React.useState(null);
  const [filterMoreAnchorEl, setFilterMoreAnchorEl] = React.useState(null);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  
  const isMobileFilterOpen = Boolean(filterMoreAnchorEl);

  const handleMobileFilterClose = () => {
    setFilterMoreAnchorEl(null);
  };

  const handleFilterClose = () => {
    setFilterAnchorEl(null);
    handleMobileFilterClose();
  };

  const handleMobileFilterOpen = (event) => {
    setFilterMoreAnchorEl(event.currentTarget);
    
  };
  const handleAuth =()=>{
   
    if(user){

      auth.signOut();
        dispatch({
          type: actionTypes.CLEAR_SHOPPING_CART,
          
        });
        dispatch({
          type: actionTypes.SET_USER,
          user: null
        });
        
        history.push("/")

    }
  }
  
  const mobileFilterId = 'primary-search-account-Filter';
  const renderMobileFilter = (
    <Menu 
      anchorEl={filterMoreAnchorEl}
     sx={{marginTop:"15px",paddingBottom:"0px"}}
      id={mobileFilterId}
      keepMounted
    
      open={isMobileFilterOpen}
      onClose={handleMobileFilterClose}
      
    >
     <Filtter 
     products={products} 
     paddingBottom="0px"
    />
    
    </Menu>
  )

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu 
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <Link to="/buy-page" >
      <MenuItem style={{width:"100%",display:"flex",justifyContent:"center",padding:"10px" }}>
          <Badge badgeContent={basket?.length} color="error">
          <ShoppingCart size="large" style={{color:"black",padding:"10px" }} />
          </Badge>
      </MenuItem>
      </Link>

      <Link to={loadFilterPage} > 
      <MenuItem style={{width:"100%",display:"flex",justifyContent:"center",padding:"10px" }}
      onClick={handleMobileFilterOpen}
      aria-controls={mobileFilterId}
      aria-haspopup="true"
      aria-label="Filter"
      >
      
        <FilterAltIcon size="large" style={{color:"black",padding:"10px" }} />
        
        </MenuItem>
        </Link>
      <MenuItem >
      <Link to="/signin" style={{ width: "100px", textDecoration: 'none'}} >
        <MenuItem
          size="large"
          aria-label="account of current user"
          aria-haspopup="true"
          width="100%"
          
          onClick={handleAuth}
        >
          
          <Typography
            variant="h6"
            noWrap
            component="div"
            color="black"
            
          >
            {user ? "LOGOUT" : "LOGIN"}
          </Typography>
          
        </MenuItem>
        </Link>
      </MenuItem>
    </Menu>
  );

  return (
    <div>
      <div>
    
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Link to="/">
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <img src={logo} height="40rem"  />
          </IconButton>
          </Link>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: {xs:'none', sm: 'none', md: 'block' } }}
          >
            Hello {user ? user.email : "Ghest"}
          </Typography>
          
          <Box sx={{ flexGrow: 1 }} />
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              
            />
             
          </Search>
          
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
             
          <Link to={loadFilterPage} style={{ textDecoration: 'none', color: "white", display:"flex", alignItems:"center"}}>
        <IconButton color="inherit" onClick={handleMobileFilterOpen}
        aria-controls={mobileFilterId}
        aria-haspopup="true"
        aria-label="show more"
        
        >

        <FilterAltIcon />
        </IconButton>
       </Link>     

            <Link   to="/buy-page"  style={{display:"flex", alignItems:"center", color:"white", textDecoration: 'none', }}>
            <IconButton  alignItems="center" color="inherit">
              <Badge badgeContent={basket?.length} color="error">
              <ShoppingCart />
              </Badge>
            </IconButton>
            </Link>
            <Link to="/signin" style={{ textDecoration: 'none', color: "white"}}>
            <IconButton
              size="large"
              edge="end"
              color="inherit"
              onClick={handleAuth}
            >
             <Typography
            variant="h6"
            noWrap
            component="div"
            color="inherit"
            
          >
           {user ? "SignOUT" : "SignIN"}
          </Typography>

            </IconButton>
            </Link>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMobileFilter}
    </Box>
    
    </div>
    </div>
  );
}
