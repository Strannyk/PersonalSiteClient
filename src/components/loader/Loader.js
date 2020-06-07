import React from 'react';
import { WindMillLoading } from 'react-loadingg';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    position: 'fixed',
    left: '0',
    top: '0',
    width: '100vw',
    height: '100vh',
    background: 'rgb(0, 0, 0, 0.7)',
    zIndex: '9'
  }
}));

function Loader() {

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <WindMillLoading speed={2} size={'large'} />
    </div>
  );
}

export default Loader;
