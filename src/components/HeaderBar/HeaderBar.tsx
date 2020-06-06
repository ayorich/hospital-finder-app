import React from 'react';
import {  makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 1,
    },
    
    title: {
      display: "none",
      marginRight: "120px",
      [theme.breakpoints.up("sm")]: {
        display: "block",
      },
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      backgroundColor: "white",
    },
    inputInput: {
      width: "30%",
      backgroundColor: "white",
    },
  })
);

interface Props {
  radiusValue:any;
  setRadiusValue:any;
  setsearchQuery:any;
  searchQuery:any;
}

const PrimarySearchAppBar: React.FunctionComponent<Props> = (Props) => {
    const classes = useStyles();
    const radiusValue  = Props.radiusValue;
    const setRadiusValue = Props.setRadiusValue;
    const setsearchQuery = Props.setsearchQuery;
  const searchQuery = Props.searchQuery;
  
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setRadiusValue(event.target.value);
  };
  const queryhandle = (event: React.ChangeEvent<{ value: unknown }>) => {
    setsearchQuery(event.target.value );
  };
  
  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            Hospital Finder
          </Typography>
            <TextField 
            id="outlined-search" 
            label="search locations"
            variant="outlined"
            type="text"
            value={searchQuery}
            className={classes.inputInput}
            onChange={queryhandle}
            />
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="demo-simple-select-outlined-label">
              Radius
            </InputLabel>
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
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default PrimarySearchAppBar;


