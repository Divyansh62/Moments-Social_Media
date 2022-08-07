import React,{useState} from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container} from '@material-ui/core';
import {GoogleLogin} from 'react-google-login';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from './styles.js'
import Input from './input.js';
import Icon from './icon.js';
import { useDispatch } from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {signin, signup} from '../../actions/auth.js';


const initialState={firstName:'', lastName:'', email:'', password:'', showPassword:''};
const Auth = () => {
const classes=useStyles();
const [showPassword, setShowPassword] = useState(false);
const [isSignup, setIsSignup] = useState(false);
const[formData, setFormData]=useState(initialState);
const dispatch=useDispatch();
const navigate=useNavigate();

const handleSubmit=(e)=>{
  e.preventDefault();
  if(isSignup){
    dispatch(signup(formData,navigate))
  }else{
    dispatch(signin(formData,navigate))
  }
};
const handleChange=(e)=>{
  setFormData({...formData, [e.target.name]:e.target.value})
};
const handleShowPassword = () => setShowPassword(!showPassword);
const switchMode = () => {
  setIsSignup((prevIsSignup) => !prevIsSignup);
  setShowPassword(false);
};

const googleSuccess = async (res) => {
  const result=res?.profileObj;
  const token= res?.tokenId;
  try {
    dispatch({type:'AUTH', data:{result, token}});
    navigate('/');
  } catch (error) {
    console.log(error)
  }
};

const googFailure=(error)=>{
  console.log(error)
  console.log("Google sign in unsuccessful");
}

return (
    <Container component="main" maxWidth="xs">
    <Paper className={classes.paper} elevation={3}>
    <Avatar className={classes.Avatar}>
    <LockOutlinedIcon />
    </Avatar>
    <Typography variant='h5'>{isSignup?'Sign Up':'Sign In'}</Typography>
    <form className={classes.form} onSubmit={handleSubmit}>
    <Grid container spacing={2}>
    {
      isSignup&&(
        <>
        <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
        <Input name="lastName" label="Last Name" handleChange={handleChange} half />
        </>
      )
    }
    <Input name="email" label="Email Address" handleChange={handleChange} type="email"/>
    <Input name='password' label="password" handleChange={handleChange} type={showPassword?"text":"password"} handleShowPassword={handleShowPassword}/>
    {isSignup&& <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password"  / >}
    
    </Grid>
    <br></br>
    

    <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>
    {isSignup?'Sign Up': 'Sign In'}
    </Button>

    <GoogleLogin
    clientId="318198242680-lmaokb0m8po33frutgfhd9lli7cmqpem.apps.googleusercontent.com"
    render={(renderProps) => (
      <Button className={classes.googleButton} color="secondary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
        Google Sign In
      </Button>
    )}
    onSuccess={googleSuccess}
    onFailure={googFailure}
    cookiePolicy="single_host_origin"
    />
    <Grid container justify='flex-end'>
    <Button onClick={switchMode} color="primary" variant='outlined'>
    
    {isSignup?'Already Have an account? Sign In':"Don't have one? Sign Up "}
    </Button>
    </Grid>
    <br></br>
    
    
    </form>
    </Paper>
    </Container>
  )
}

export default Auth