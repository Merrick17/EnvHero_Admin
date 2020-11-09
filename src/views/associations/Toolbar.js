import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import ImageUploader from 'react-images-upload';

import {
  addAssociation,
  getAllAssociations
} from '../../actions/association.action';
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

import { Search as SearchIcon } from 'react-feather';
import { useSelector, useDispatch } from 'react-redux';

const useStyles = makeStyles((theme) => ({
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
  const [adr, setAdr] = React.useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const [Upload, setUpload] = useState({ image: '' });
  const [password, setPassword] = useState('');
  const handleChange = (event) => {
    setAdr(event.target.value);
  };
  const dispatch = useDispatch();
  const state = useSelector((state) => state.associationReducer);
  const [selectedDate, setSelectedDate] = React.useState(
    new Date('2014-08-18T21:11:54')
  );
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const addAssociationHandling = () => {
    let formData = new FormData();
    formData.append('fullName', name);
    formData.append('lastName', '');
    formData.append('email', email);
    formData.append('password', password);
    formData.append('phoneNumber', phone);
    formData.append('address', adr);
    formData.append('image', Upload.image);
    dispatch(addAssociation(formData));
    handleClose();
  };
  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Ajouter une association
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {/* To subscribe to this website, please enter your email address here.
            We will send updates occasionally. */}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Nom"
            type="text"
            fullWidth
            variant="outlined"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="emailAssociation"
            label="Email"
            type="email"
            fullWidth
            variant="outlined"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />

          <TextField
            autoFocus
            margin="dense"
            id="psw"
            label="Mot de passe"
            type="password"
            fullWidth
            variant="outlined"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="phone"
            label="Téléphone"
            type="phone"
            fullWidth
            variant="outlined"
            value={phone}
            onChange={(event) => {
              setPhone(event.target.value);
            }}
          />

          <InputLabel id="demo-simple-select-outlined-label">Region</InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={adr}
            onChange={handleChange}
            label="Organisé Par"
            fullWidth
            variant="outlined"
            autoFocus
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={'Ariana'}>Ariana</MenuItem>
            <MenuItem value={'Beja'}>Béja</MenuItem>
            <MenuItem value={'Tunis'}>Tunis</MenuItem>
            <MenuItem value={'Ben Arous'}>Ben Arous</MenuItem>
            <MenuItem value={'Sousse'}>Sousse</MenuItem>
            <MenuItem value={'Monastir'}>Monastir</MenuItem>
            <MenuItem value={'Kairouan'}>Kairouan</MenuItem>
            <MenuItem value={'Gabes'}>Gabes</MenuItem>
            <MenuItem value={'Tozeur'}>Tozeur</MenuItem>
            <MenuItem value={'Siliana'}>Siliana</MenuItem>
            <MenuItem value={'SidiBouzid'}>Sidi Bouzid</MenuItem>
            <MenuItem value={'Mednine'}>Mednine</MenuItem>
            <MenuItem value={'Sfax'}>Sfax</MenuItem>
            <MenuItem value={'Mahdia'}>Mahdia</MenuItem>
            <MenuItem value={'Tataouine'}>Tataouine</MenuItem>
            <MenuItem value={'Gafsa'}>Gafsa</MenuItem>
            <MenuItem value={'Zaghouane'}>Zaghouane</MenuItem>
            <MenuItem value={'Manouba'}>Manouba</MenuItem>
            <MenuItem value={'Nabeul'}>Nabeul</MenuItem>
            <MenuItem value={'Bizert'}>Bizert</MenuItem>
            <MenuItem value={'Jandouba'}>Jandouba</MenuItem>
            <MenuItem value={'Gebili'}>Gebili</MenuItem>
            <MenuItem value={'Kef'}>Kef</MenuItem>
            <MenuItem value={'kasserine'}>Kasserine</MenuItem>
          </Select>
          <ImageUploader
            withIcon={true}
            buttonText="Choisir une image"
            withPreview={true}
            onChange={(e) => {
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
          <Button onClick={addAssociationHandling} color="primary">
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
          Ajouter une association
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
