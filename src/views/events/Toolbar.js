import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  makeStyles,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  MenuItem,
  InputLabel,
  Select
} from '@material-ui/core';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { addEventApi } from '../../actions/events.actions';
import { Search as SearchIcon } from 'react-feather';
import ImageUploader from 'react-images-upload';
import incidentReducer from 'src/reducers/incident.reducer';
import { useSelector } from 'react-redux';
import { getAllDangerZone } from 'src/actions/danger.action';
const useStyles = makeStyles(theme => ({
  root: {},
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 150,
    marginRight: theme.spacing(2)
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

const Toolbar = ({ className, ...rest }) => {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [emplacement, setEmplacement] = useState('');
  const dispatch = useDispatch();
  const [Upload, setUpload] = useState({ image: '' });
  const [zone, setZone] = useState('');
  useEffect(() => {
    dispatch(getAllDangerZone());
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
  const addEvent = () => {
    let body = new FormData();
    body.append('title', name);
    body.append('desc', desc);
    body.append('dateEvent', selectedDate.toDateString());
    body.append('emplacement', emplacement);
    let added = localStorage.getItem('userid');
    body.append('image', Upload.image);
    body.append('addedBy', added);
    body.append('category', zone);
    dispatch(addEventApi(body));
    handleClose();
  };
  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Ajouter un evenement</DialogTitle>
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
              //console.log()
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
              }}
            >
              <MenuItem value="">
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

          {/* <TextField
            autoFocus
            margin="dense"
            id="emp"
            label="Emplacement"
            type="text"
            fullWidth
            variant="outlined"
            value={emplacement}
            onChange={event => {
              setEmplacement(event.target.value);
            }}
          /> */}

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
          <Button onClick={addEvent} color="primary">
            Confirmer
          </Button>
        </DialogActions>
      </Dialog>

      <Box display="flex" justifyContent="flex-end">
        {/* <Button className={classes.importButton}>
          Import
        </Button> */}
        <Button className={classes.exportButton}>Exporter En CSV</Button>
        <Button
          color="primary"
          variant="contained"
          onClick={() => {
            handleClickOpen();
          }}
        >
          Ajouter un evenements
        </Button>
      </Box>
      <Box mt={3}>
        <Card>
          <CardContent>
            <Box maxWidth={500}>
              <TextField
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon fontSize="small" color="action">
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  )
                }}
                placeholder="Rechercher"
                variant="outlined"
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string
};

export default Toolbar;
