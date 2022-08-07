import React, { useState, useEffect } from 'react';
import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core';
import useStyles from './styles.js';
import {Link, useNavigate, useLocation} from 'react-router-dom';
import moments from '../../images/moments.png';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';

const Navbar=()=> {
    const classes=useStyles();
    
    const [user,setUser]=useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const location=useLocation();
    const logout=()=>{
       dispatch({type:'LOGOUT'});
       navigate('/');
       setUser(null);
    }

    useEffect(()=>{
      const token=user?.token;

      if(token){
        const decodedToken=decode(token);

        if(decodedToken.exp*1000 < new Date().getTime()) logout();
      }

      setUser(JSON.parse(localStorage.getItem('profile')))
    },[location]);
return(
    <AppBar className={classes.appBar} position="static" color="inherit">
    <div className={classes.brandContainer}>
    <Typography  component={Link} to="/" className={classes.heading} style={{color:"#f54242"}} variant="h3" align="center" >MOMENTS</Typography>
    <img className={classes.image} src={moments} alt="moments" height="40px"/>
    
    </div>
    
    <Toolbar className={classes.toolbar}>
    {user?(<div className={classes.profile}>
        <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
        <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
        <Button variant='outlined' className={classes.logout} color="secondary" onClick={logout}>logout</Button>
        </div>)
    
    :(
        <Button component={Link} to="/auth" variant='contained' color='primary'>Sign In</Button>
    )}
    </Toolbar>

    </AppBar>
);
}

export default Navbar;