import setAuthToken from '../utils/setAuthToken';
import axios from 'axios';
import Swal from 'sweetalert2';
const BASE_URL = 'https://env-hero-api.herokuapp.com/events';

export const getAllEvents = () => async dispatch => {
  setAuthToken(localStorage.token);
  let result = await axios.get(BASE_URL);
  console.log(result.data);
  dispatch({
    type: 'GET_ALL_EVENTS',
    payload: result.data.Events
  });
};

export const addEventApi = body => async dispatch => {
  setAuthToken(localStorage.token);
  let result = await axios.post(BASE_URL + '/create', body);
  console.log(result.data);
  dispatch(getAllEvents());
};

export const deleteEvent = id => async dispatch => {
  setAuthToken(localStorage.token);
  let result = await axios.delete(BASE_URL + '/' + id + '/delete');
  console.log(result.data);
  dispatch(getAllEvents());
};

export const getEventByType = type => async dispatch => {
  setAuthToken(localStorage.token);
  let result = await axios.get(BASE_URL + '/category/' + type);
  dispatch({
    type: 'GET_ALL_EVENTS',
    payload: result.data
  });
};
export const updateEvent = (id, value) => async dispatch => {
  setAuthToken(localStorage.token);
  let result = await axios.put(BASE_URL + '/' + id + '/update/', {
    value: value
  });
  dispatch(getAllEvents());
};

export const disableEvent = (id, value) => async dispatch => {
  setAuthToken(localStorage.token);
  let result = await axios.put(BASE_URL + '/enable/' + id, {
    value: value
  });
  dispatch(getAllEvents());
};
