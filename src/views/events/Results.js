import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import PerfectScrollbar from 'react-perfect-scrollbar';
import IconButton from '@material-ui/core/IconButton';
import { CheckCircle, Edit, Trash, XCircle } from 'react-feather';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  makeStyles
} from '@material-ui/core';
import getInitials from 'src/utils/getInitials';
import {
  getAllEvents,
  deleteEvent,
  disableEvent
} from '../../actions/events.actions';
import EventListView from '.';

const useStyles = makeStyles(theme => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  }
}));

const Results = ({ className, customers, ...rest }) => {
  const classes = useStyles();
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const dispatch = useDispatch();
  const BASE_URL = 'https://env-hero-api.herokuapp.com/';
  const handleSelectAll = event => {
    let newSelectedCustomerIds;

    if (event.target.checked) {
      newSelectedCustomerIds = customers.map(customer => customer.id);
    } else {
      newSelectedCustomerIds = [];
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedCustomerIds.indexOf(id);
    let newSelectedCustomerIds = [];

    if (selectedIndex === -1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds,
        id
      );
    } else if (selectedIndex === 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(1)
      );
    } else if (selectedIndex === selectedCustomerIds.length - 1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(0, -1)
      );
    } else if (selectedIndex > 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(0, selectedIndex),
        selectedCustomerIds.slice(selectedIndex + 1)
      );
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleLimitChange = event => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };
  const dispatcher = useDispatch();
  const state = useSelector(state => state.eventReducer);
  useEffect(() => {
    dispatcher(getAllEvents());
    console.log(state);
  }, []);

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <PerfectScrollbar>
        <Box minWidth={1050}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox"></TableCell>
                <TableCell>Nom Evenements</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Zone de danger</TableCell>
                <TableCell>Etats</TableCell>
                <TableCell>Oragnisé Par</TableCell>
                <TableCell>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {state.map(ev => {
                console.log(ev);
                return (
                  <TableRow
                    hover
                    key={ev._id}
                    selected={selectedCustomerIds.indexOf(ev._id) !== -1}
                  >
                    <TableCell padding="checkbox"></TableCell>
                    <TableCell>
                      <Box alignItems="center" display="flex">
                        <Avatar className={classes.avatar}>
                          <img src={BASE_URL + ev.eventImage} />
                        </Avatar>
                        <Typography color="textPrimary" variant="body1">
                          {ev.title}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{ev.description}</TableCell>
                    <TableCell>
                      {ev.incident && ev.incident.lat}{' '}
                      {ev.incident && ev.incident.lng}
                    </TableCell>
                    <TableCell>{ev.enabled ? 'ACTIVE' : 'ANNULER'}</TableCell>
                    <TableCell>
                      {ev.addedBy.firstName} {ev.addedBy.lastName}
                    </TableCell>
                    {localStorage.getItem('role') === 'ADMIN' ? (
                      <TableCell>
                        {ev.enabled ? (
                          <IconButton
                            color="primary"
                            onClick={() => {
                              dispatch(disableEvent(ev._id, false));
                            }}
                          >
                            <XCircle />
                          </IconButton>
                        ) : (
                          <IconButton
                            color="primary"
                            onClick={() => {
                              dispatch(disableEvent(ev._id, true));
                            }}
                          >
                            <CheckCircle />
                          </IconButton>
                        )}
                        <IconButton
                          color="inherit"
                          onClick={() => {
                            dispatch(deleteEvent(ev._id));
                          }}
                        >
                          <Trash />
                        </IconButton>
                      </TableCell>
                    ) : (
                      <TableCell>
                        <IconButton
                          color="inherit"
                          onClick={() => {
                            dispatch(deleteEvent(ev._id));
                          }}
                        >
                          <Trash />
                        </IconButton>
                      </TableCell>
                    )}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={customers.length}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  customers: PropTypes.array.isRequired
};

export default Results;
