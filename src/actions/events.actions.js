import setAuthToken from '../utils/setAuthToken';
import axios from 'axios';
import Swal from 'sweetalert2';
const BASE_URL = 'https://env-hero.herokuapp.com/events';

export const getAllEvents = () => async dispatch => {
  setAuthToken(localStorage.token);
  let result = await axios.get(BASE_URL);
  console.log(result.data);
  dispatch({
    type: 'GET_ALL_EVENTS',
    payload: result.data.Events
  });
};
