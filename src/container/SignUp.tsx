import React from 'react';
import { Link , withRouter } from 'react-router-dom';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import firebase from '../firebaseConfig';
import * as ROUTES from "../constants/routes";

const Copyright = () => (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <a color="inherit" href="https://enye.tech/">
        HOSPITAL FINDER
      </a>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', 
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const INITIAL_STATE = {
  email: "",
  passwordOne: "",
  passwordTwo: "",
  error: null,
};

interface Props {
 history:any;
  
}

interface signUp{
    email:any,
    passwordOne: string,
    passwordTwo: string,
    error: any,
}

const SignUp: React.FunctionComponent<Props> = (props) => {

  const classes = useStyles();
  const [signState, setsignState] = React.useState<signUp>(INITIAL_STATE);
  const { email, passwordOne, passwordTwo, error } = signState;

// SIGNS UP USER ,SET LOCAL STORAGE REDIRECT USER TO HOMEPAGE
  const onSubmit = (event :any) => {
      firebase.doCreateUserWithEmailAndPassword(email, passwordOne)
          .then((authUser) => {
            localStorage.setItem('authUser', JSON.stringify(authUser))
            //empty input values on success
          setsignState({ ...signState });
          props.history.push(ROUTES.HOME);
          })
          .catch((error : any) => {
          setsignState({
              ...signState, error,
          });

          });

      event.preventDefault();
  };

// HANDLES INPUT VALUE FROM FORM INPUTS FIELD
const handleChange = (event: React.ChangeEvent<{ value: unknown, name: string }>) => {
  setsignState({
    ...signState,
    [event.currentTarget.name] : event.target.value,
  });
};


// DISABLE SIGNUP BUTTON UNTIL REQUIREMENTS ARE REACHED
const isInvalid = 
            passwordOne !== passwordTwo ||
            passwordOne === "" ||
            email === "" ;

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        {error && <p>{error.message}</p>}
        <form onSubmit={onSubmit} className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="passwordOne"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="passwordTwo"
                label="Confirm Password"
                type="password"
                id="password-2"
                autoComplete="current-password"
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={isInvalid}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to={ROUTES.SIGN_IN}>Already have an account? Sign in</Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}


export default withRouter(SignUp);