import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
  progress: {
    margin: theme.spacing(2),
  },
}));

export default ()=> {
  const classes = useStyles();

  return (
    
   <span className="align-middle">
      <CircularProgress className={classes.progress} color="secondary"  
       
        /></span>

  
  );
}