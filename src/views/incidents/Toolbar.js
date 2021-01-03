import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  Select,
  MenuItem,
  makeStyles,
  InputLabel
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';
import { useState } from 'react';
import { getDangerZoneByType } from 'src/actions/danger.action';
import { useDispatch } from 'react-redux';
const useStyles = makeStyles(theme => ({
  root: {},
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  }
}));

const Toolbar = ({ className, ...rest }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [type, setType] = useState('AIR');
  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Box display="flex" justifyContent="flex-end">
        {/* <Button className={classes.importButton}>
          Import
        </Button> */}
        <Button className={classes.exportButton}>Exporter En CSV</Button>
        {/* <Button
          color="primary"
          variant="contained"
        >
         Ajouter un evenements
        </Button> */}
      </Box>
      <Box mt={3}>
        <Card>
          <CardContent>
            <Box minWidth={500}>
              {/* <TextField
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon
                        fontSize="small"
                        color="action"
                      >
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  )
                }}
                placeholder="Rechercher"
                variant="outlined"
              /> */}
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">TYPE</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={type}
                  onChange={event => {
                    setType(event.target.value);
                  }}
                  style={{
                    minWidth: '500px'
                  }}
                >
                  <MenuItem value={'AIR'}>AIR</MenuItem>
                  <MenuItem value={'TERRE'}>TERRE</MenuItem>
                  <MenuItem value={'EAU'}>EAU</MenuItem>
                </Select>
              </FormControl>
              <Button
                variant="contained"
                color="primary"
                style={{ marginLeft: '20px', marginTop: '10px' }}
                onClick={() => {
                  dispatch(getDangerZoneByType(type));
                }}
              >
                Chercher
              </Button>
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
