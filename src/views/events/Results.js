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
  makeStyles,
  Button,
  Dialog,
  MenuItem,
  DialogTitle,
  DialogContent,
  TextField,
  Select,
  FormControl,
  DialogActions,
  DialogContentText
} from '@material-ui/core';
import { KeyboardDatePicker } from '@material-ui/pickers';
import {
  addEventApi,
  getEventByType,
  updateEvent
} from '../../actions/events.actions';
import { Search as SearchIcon } from 'react-feather';
import ImageUploader from 'react-images-upload';
import getInitials from 'src/utils/getInitials';
import {
  getAllEvents,
  deleteEvent,
  disableEvent
} from '../../actions/events.actions';
import EventListView from '.';
import { Fragment } from 'react';

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

  const [open, setOpen] = React.useState(false);

  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [emplacement, setEmplacement] = useState('');
  const [selectedEvent, setSelectedEvent] = useState('');
  const dispatch = useDispatch();
  const [Upload, setUpload] = useState({ image: '' });
  const [zone, setZone] = useState('');
  const [type, setType] = useState('AIR');
  useEffect(() => {
    dispatch(getAllEvents());
  }, []);
  const dangerzone = useSelector(({ incidentReducer }) => incidentReducer);
  const [selectedDate, setSelectedDate] = React.useState(
    new Date('2014-08-18T21:11:54')
  );
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleDateChange = date => {
    setSelectedDate(date);
    //setOpen(false);
  };
  const editEvent = i => {
    let body = new FormData();
    body.append('title', name);
    body.append('desc', desc);
    body.append('dateEvent', selectedDate.toDateString());
    body.append('emplacement', emplacement);
    let added = localStorage.getItem('userid');
    body.append('image', Upload.image);
    body.append('addedBy', added);
    body.append('type', type);
    body.append('incident', zone);
    dispatch(updateEvent(body));
    handleClose();
  };
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
  // useEffect(() => {
  //   dispatcher(getAllEvents());
  //   console.log(state);
  // }, []);

  return (
    <Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Modifier un evenement</DialogTitle>
        <DialogContent>
          <DialogContentText></DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Nom"
            type="text"
            fullWidth
            variant="outlined"
            value={name}
            onChange={event => {
              setName(event.target.value);
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="desc"
            label="Description"
            type="text"
            fullWidth
            variant="outlined"
            value={desc}
            onChange={event => {
              setDesc(event.target.value);
            }}
          />
          <FormControl variant="outlined" fullWidth>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              fullWidth
              value={zone}
              onChange={event => {
                setZone(event.target.value);
                console.log(zone);
              }}
            >
              <MenuItem value="" disabled={true}>
                <em>Aucune</em>
              </MenuItem>
              {dangerzone.map(elm => {
                return (
                  <MenuItem value={elm._id} key={elm._id}>
                    {elm.desc}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <FormControl
            variant="outlined"
            fullWidth
            style={{ marginTop: '5px' }}
          >
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              fullWidth
              value={type}
              onChange={event => {
                setType(event.target.value);
              }}
            >
              <MenuItem value="AIR">AIR</MenuItem>
              <MenuItem value="AIR">EAU</MenuItem>
              <MenuItem value="AIR">TERRE</MenuItem>
            </Select>
          </FormControl>

          <KeyboardDatePicker
            margin="normal"
            id="date-picker-dialog"
            label="Date d'evenements"
            format="MM/dd/yyyy"
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change date'
            }}
          />

          <ImageUploader
            withIcon={true}
            buttonText="Choisir une image"
            withPreview={true}
            onChange={e => {
              setUpload({
                image: e[0]
              });
            }}
            imgExtension={['.jpg', '.gif', '.png', '.gif']}
            maxFileSize={5242880}
            singleImage={true}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Annuler
          </Button>
          <Button
            onClick={() => {
              editEvent(selectedEvent);
            }}
            color="primary"
          >
            Confirmer
          </Button>
        </DialogActions>
      </Dialog>
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
                  <TableCell>Actions</TableCell>
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
                      <TableCell>{ev.datEvent}</TableCell>
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
                              setName(ev.title);
                              setDesc(ev.description);
                              setZone(ev.incident._id);
                              setSelectedDate(new Date(ev.datEvent));
                              setSelectedEvent(ev._id);
                              setOpen(true);
                            }}
                          >
                            <Edit />
                          </IconButton>
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
    </Fragment>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  customers: PropTypes.array.isRequired
};

export default Results;
