import setAuthToken from '../utils/setAuthToken';
import axios from 'axios';
import Swal from 'sweetalert2';
const BASE_URL = 'https://env-hero-api.herokuapp.com/user';

export const getAllUsers = () => async dispatch => {
  setAuthToken(localStorage.token);
  let result = await axios.get(BASE_URL);
  console.log(result.data);
  dispatch({
    type: 'GET_ALL_USERS',
    payload: result.data
  });
};

export const disableUser = (id, value) => async dispatch => {
  setAuthToken(localStorage.token);
  let result = await axios.put(BASE_URL + '/disable/' + id, {
    value: value
  });
  dispatch(getAllUsers());
};

export const deleteUser = id => async dispatch => {
  setAuthToken(localStorage.token);
  let result = await axios.delete(BASE_URL + '/' + id + '/delete');
  dispatch(getAllUsers());
};
