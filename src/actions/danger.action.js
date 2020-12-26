import setAuthToken from '../utils/setAuthToken';
import axios from 'axios';
import Swal from 'sweetalert2';
const BASE_URL = 'https://env-hero-api.herokuapp.com/incident';

export const getAllDangerZone = () => async dispatch => {
  setAuthToken(localStorage.token);
  let result = await axios.get(BASE_URL);
  console.log(result.data);
  dispatch({
    type: 'GET_ALL_ZONE',
    payload: result.data.message
  });
};

export const addDangerZone = data => async dispatch => {
  setAuthToken(localStorage.token);
  let result = await axios.post(BASE_URL + '/create', data);
  console.log(result);
  dispatch(getAllDangerZone());
};
// export const addEventApi = (body) => async (dispatch) => {
//   setAuthToken(localStorage.token);
//   let result = await axios.post(BASE_URL + '/create', body);
//   console.log(result.data);
//   dispatch({
//     type: 'ADD_EVENT',;
//     payload: result.data.result
//   });
// };
