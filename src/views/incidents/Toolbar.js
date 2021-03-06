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
import { getDangerZoneByType ,getAllDangerZone} from 'src/actions/danger.action';
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
        <Button className={classes.exportButton}>Exporter En CSV</Button>
      </Box>
      <Box mt={3}>
        <Card>
          <CardContent>
            <Box minWidth={500}>
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
                  <MenuItem value={'TOUS'}>AIR</MenuItem>
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
                  if (type != 'TOUS') {
                    dispatch(getDangerZoneByType(type));
                  } else {
                    dispatch(getAllDangerZone());
                  }
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
