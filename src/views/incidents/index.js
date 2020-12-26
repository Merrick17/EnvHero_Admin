import React, { useState } from 'react';
import {
  Box,
  Container,
  makeStyles,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  TextField,
  Select,
  InputLabel,
  FormControl,
  MenuItem
} from '@material-ui/core';
import Page from 'src/components/Page';
import MapGL, { Source, Layer, Marker } from '@urbica/react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import ImageUploader from 'react-images-upload';
import Toolbar from './Toolbar';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { addDangerZone, getAllDangerZone } from 'src/actions/danger.action';
import Results from './Results';
const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const IncidentsListView = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [lat, setLat] = useState(0);
  const [long, setLong] = useState(0);
  const dispatch = useDispatch();
  const zones = useSelector(({ incidentReducer }) => incidentReducer);
  const handleClose = () => {
    setOpen(false);
  };
  const [type, setType] = useState('AIR');
  const [Upload, setUpload] = useState({ image: '' });
  const [desc, setDesc] = useState('');
  const [viewport, setViewport] = useState({
    latitude: 37.78,
    longitude: -122.41,
    zoom: 11
  });
  const onClick = event => {
    const { lngLat } = event;
    setOpen(true);
    console.log(lngLat);
    setLat(lngLat.lat);
    setLong(lngLat.lng);
  };

  const renderMap = () => {
    navigator.geolocation.getCurrentPosition(position => {
      let lat = position.coords.latitude;
      let long = position.coords.longitude;
      setViewport({
        latitude: lat,
        longitude: long,
        zoom: 11
      });
    });
  };
  const DialogComp = ({ open, handleClose }) => {
    const confirm = () => {
      let formData = new FormData();
      formData.append('type', type);
      formData.append('lat', lat);
      formData.append('lng', long);
      formData.append('image', Upload.image);
      formData.append('user', localStorage.userid);
      formData.append('desc', desc);
      dispatch(addDangerZone(formData));
      handleClose();
    };
    return (
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Ajouter une zone de danger
        </DialogTitle>
        <DialogContent>
          <Box
            display="flex"
            flexDirection="column"
            height="100%"
            justifyContent="center"
          >
            <Box marginBottom={2}>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">
                  Type
                </InputLabel>
                <Select
                  fullWidth={true}
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={type}
                  onChange={event => {
                    setType(event.target.value);
                  }}
                  label="Type"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={'AIR'}>AIR</MenuItem>
                  <MenuItem value={'EAU'}>EAU</MenuItem>
                  <MenuItem value={'TERRE'}>TERRE</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Box>
              <TextField
                fullWidth={true}
                id="outlined-basic"
                label="Description"
                variant="outlined"
                value={desc}
                onChange={event => {
                  setDesc(event.target.value);
                }}
              />
            </Box>
            <Box>
              <ImageUploader
                withIcon={true}
                buttonText="Choisir une image"
                withPreview={false}
                onChange={e => {
                  setUpload({
                    image: e[0]
                  });
                }}
                imgExtension={['.jpg', '.gif', '.png', '.gif']}
                maxFileSize={5242880}
                singleImage={true}
              />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Annuler
          </Button>
          <Button onClick={confirm} color="primary">
            Confirmer
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
  useEffect(() => {
    renderMap();
    dispatch(getAllDangerZone());
  }, []);
  return (
    <Page className={classes.root} title="Customers">
      <Container maxWidth={false}>
        <DialogComp open={open} handleClose={handleClose} />
        <Toolbar />
        <MapGL
          style={{ width: '100%', height: '600px' }}
          mapStyle="mapbox://styles/mapbox/streets-v11"
          accessToken={
            'pk.eyJ1IjoibWVycmljazE3IiwiYSI6ImNqdjg1d243YjBlbms0NW50M3ZvaGlhbG8ifQ.JvWxv9X81IW7k64zGXEY2Q'
          }
          latitude={viewport.latitude}
          longitude={viewport.longitude}
          zoom={viewport.zoom}
          onViewportChange={setViewport}
          onClick={onClick}
        >
          {zones.map((elm, ind) => {
            console.log(elm);

            return (
              <Marker key={ind} longitude={elm.lng} latitude={elm.lat}>
                <div
                  style={{
                    padding: '10px',
                    color: '#fff',
                    cursor: 'pointer',
                    background: '#1978c8',
                    borderRadius: '6px'
                  }}
                >
                  <img
                    height="50px"
                    width="50px"
                    src={`https://env-hero-api.herokuapp.com/${elm.imageUrl}`}
                  />
                  <p style={{ margin: '5%' }}> {elm.desc}</p>
                </div>
              </Marker>
            );
          })}
        </MapGL>
        {/* <Results customers={zones} /> */}
      </Container>
    </Page>
  );
};

export default IncidentsListView;
