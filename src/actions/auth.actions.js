import setAuthToken from '../utils/setAuthToken';
import axios from 'axios';
import Swal from 'sweetalert2';
const BASE_URL = 'https://env-hero.herokuapp.com/user';
export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get('/api/authcheck');
    console.log(res);
    dispatch({
      type: 'USER_LOADED',
      payload: res.data
    });
  } catch (err) {
    console.log(err.response);
    dispatch({
      type: 'AUTH_ERROR'
    });
  }
};

//Register

export const register = ({
  firstName,
  lastName,
  email,
  phoneNumber,
  password,
  navigate
}) => async dispatch => {
  // dispatch({
  //   type: 'USER_LOADING'
  // });
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  console.log(firstName);
  const body = JSON.stringify({
    firstName,
    lastName,
    email,
    phoneNumber,
    password
  });
  //console.log(body);

  try {
    const res = await axios.post(BASE_URL + '/register', body, config);
    dispatch({
      type: 'REGISTER_SUCCESS'
    });
    if (res.data.token) {
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userid', res.data.user);

      navigate('/app/customers', { replace: true });
    }
  } catch (err) {
    Swal.fire({
      title: 'Error!',
      text: "Une erreur est s'ervenue",
      icon: 'error',
      confirmButtonText: 'Cool'
    });
    dispatch({
      type: 'REGISTER_FAIL'
    });
  }
};

//Login

export const login = (email, password, navigate) => async dispatch => {
  // dispatch({
  //   type: 'USER_LOADING'
  // });
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post(BASE_URL + '/login', body, config);
    dispatch({
      type: 'LOGIN_SUCCESS',
      payload: res.data
    });
    //dispatch(loadUser());
    if (res.data.token) {
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userid', res.data.user);
      navigate('/app/customers', { replace: true });
    }
  } catch (err) {
    Swal.fire({
      title: 'Erreur!',
      text: 'Adresse ou mot de passe incorrect',
      icon: 'error',
      confirmButtonText: 'Cool'
    });
    dispatch({
      type: 'LOGIN_FAIL'
    });
  }
};

//Logout

export const logout = () => async dispatch => {
  dispatch({
    type: 'USER_LOADING'
  });
  dispatch({
    type: 'LOGOUT'
  });
};
