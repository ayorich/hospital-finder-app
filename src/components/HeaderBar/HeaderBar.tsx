import React from 'react';
import { fade, makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


import GoogleSearhBar from '../GoogleBar/GoogleBar';




const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 1,
    },
    button: {
      margin: theme.spacing(1),
      padding:'14px',
      backgroundColor: 'white',
      "&:hover": {
        backgroundColor: fade(theme.palette.common.white, 0.90),
      },
    },
    title: {
      display: "none",
      marginRight: "120px",
      [theme.breakpoints.up("sm")]: {
        display: "block",
      },
    },
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(3),
        width: "auto",
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginRight: "40px",
    },
    inputRoot: {
      color: "inherit",
    },
    
    sectionDesktop: {
      display: "none",
      [theme.breakpoints.up("md")]: {
        display: "flex",
      },
    },
    sectionMobile: {
      display: "flex",
      [theme.breakpoints.up("md")]: {
        display: "none",
      },
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      backgroundColor: "white",
    },
  })
);
// interface Props {
//   inputValue: string;
//   setInputValue:any;
// }
const PrimarySearchAppBar: React.FunctionComponent = () => {
    const classes = useStyles();
  const [inputValue, setInputValue] = React.useState('');
  const [radiusValue, setRadiusValue] = React.useState<string>();

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setRadiusValue(event.target.value as string);
  };
  

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            GOOGLE MAP
          </Typography>
          <GoogleSearhBar
            inputValue={inputValue}
            setInputValue={setInputValue}
          />
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="demo-simple-select-outlined-label">Radius</InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={radiusValue || 5}
              onChange={handleChange}
              label="Radius"
            >
              
              <MenuItem value={5}>5KM</MenuItem>
              <MenuItem value={10}>10KM</MenuItem>
              <MenuItem value={20}>20KM</MenuItem>
              <MenuItem value={30}>30KM</MenuItem>
              <MenuItem value={40}>40KM</MenuItem>
              <MenuItem value={50}>50KM</MenuItem>
            </Select>
          </FormControl>
         
          {inputValue} 
          {radiusValue}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default PrimarySearchAppBar;


