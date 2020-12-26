import React, { useState, useEffect } from 'react';
import { Box, Container, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import Results from './Results';
import Toolbar from './Toolbar';
import data from './data';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from 'src/actions/user.action';
const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const CustomerListView = () => {
  const classes = useStyles();
  const [customers, setCustomers] = useState(data);
  const dispatch = useDispatch();
  const users = useSelector(state => state.userReducer);
  useEffect(() => {
    dispatch(getAllUsers());
    console.log('Users', users);
  }, []);
  return (
    <Page className={classes.root} title="Customers">
      <Container maxWidth={false}>
        <Toolbar />
        <Box mt={3}>
          <Results customers={users.filter(elm => elm.role === 'USER')} />
        </Box>
      </Container>
    </Page>
  );
};

export default CustomerListView;
