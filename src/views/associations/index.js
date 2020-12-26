import React, { useState } from 'react';
import { Box, Container, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import Results from './Results';
import Toolbar from './Toolbar';
import data from './data';
import { useSelector } from 'react-redux';
const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const AssociationsListView = () => {
  const users = useSelector(state => state.userReducer);
  const classes = useStyles();
  const [customers] = useState(data);

  return (
    <Page className={classes.root} title="Customers">
      <Container maxWidth={false}>
        <Toolbar />
        <Box mt={3}>
          <Results
            customers={users.filter(elm => elm.role === 'ASSOCIATION')}
          />
        </Box>
      </Container>
    </Page>
  );
};

export default AssociationsListView;
