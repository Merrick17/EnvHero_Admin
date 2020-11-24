import setAuthToken from '../utils/setAuthToken';
import axios from 'axios';
const BASE_URL = 'https://env-hero-api.herokuapp.com/user/association';
export const addAssociation = (body) => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    let result = await axios.post(BASE_URL + '/add', body);
    dispatch({
      type: 'ADD_ASSOCIATION',
      payload: ''
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAllAssociations = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    let result = await axios.post(BASE_URL, { type: true });
    dispatch({
      type: 'GET_ALL_ASSOCIATIONS',
      payload: result.data.message
    });
  } catch (error) {
    console.log(error);
  }
};
