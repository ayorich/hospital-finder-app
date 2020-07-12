import React , {useContext} from "react";
import { Link,  useHistory } from "react-router-dom";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Container from "@material-ui/core/Container";

import firebase from "../firebase";
import { AuthContext } from "../AuthProvider";

import * as ROUTES from "../constants/routes";

const Copyright = () => (
  <Typography variant="body2" color="textSecondary" align="center">
    {"Copyright © "}
    <a color="inherit" href="https://material-ui.com/">
      HOSPITAL FINDER
    </a>{" "}
    {new Date().getFullYear()}
    {"."}
  </Typography>
);

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      },
      avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
      },
      form: {
        width: "100%",
        marginTop: theme.spacing(3),
      },
      submit: {
        margin: theme.spacing(3, 0, 2),
      },
    }),
);


const INITIAL_STATE = {
  email: "",
  password: "",
  error: null,
};

interface Props {
  history: any;
}

interface signIn {
  email: string;
  password: string;
  error: any;
}
const SignIn: React.FC<Props> = (props): JSX.Element => {
    const classes = useStyles();
    const [signState, setsignState] = React.useState(INITIAL_STATE as signIn);
    const { email, password, error } = signState;

    const authContext = useContext(AuthContext);
    const history = useHistory();
   

    //ONSUBMIT HANDLES USER DATAS, FIREBASE VALIDATES
    const onSubmit = (event: any) => {
      firebase.doSignInWithEmailAndPassword(email, password)
        .then((res:any) => {
          console.log(res);
              authContext.setUser(res);
                //CLEAN USER INPUTS
                setsignState({ ...INITIAL_STATE });
                // REDIRECTS TO HOMEPAGE
                history.push(ROUTES.HOME);

              })
        .catch((error: any) => {
          // SETSTATE ERROR TRUE
          setsignState({
            ...signState,
            error,
          });
        });

      event.preventDefault();
    };

    // HANDLES USER INPUTS
    const handleChange = (event: React.ChangeEvent<{ value: unknown; name: string }>) => {
            event.persist();
            setsignState({
              ...signState,
              [event.currentTarget.name]: event.target.value,
            });
    };

    // DISABLE FORM BUTTON
    const isInvalid =  password === '' || email === '';

    return (
      <Container component="main" maxWidth="xs" data-test="component-SignIn">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
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
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
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
              Sign In
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link to={ROUTES.SIGN_UP}>Don't have an account? Sign up</Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
    );
};

export default SignIn;
