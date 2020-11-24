import setAuthToken from '../utils/setAuthToken';
import axios from 'axios';
import Swal from 'sweetalert2';
const BASE_URL = 'https://env-hero-api.herokuapp.com/user';
export const loadUser = () => async (dispatch) => {
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

export const register = (body, navigate) => async (dispatch) => {
  // dispatch({
  //   type: 'USER_LOADING'
  // });
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post(BASE_URL + '/association/add', body, config);
    dispatch({
      type: 'REGISTER_SUCCESS'
    });
    if (res.data.user) {
      Swal.fire({
        title: 'Success!',
        text: "Success , en attentant de la confirmation d'admin ",
        icon: 'success',
        confirmButtonText: 'Cool'
      });
    } else {
      Swal.fire({
        title: 'Error!',
        text: "Une erreur est s'ervenue",
        icon: 'error',
        confirmButtonText: 'Cool'
      });
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

export const login = (email, password, navigate) => async (dispatch) => {
  dispatch({
    type: 'USER_LOADING'
  });
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post(
      BASE_URL + '/login',
      {
        login: email,
        password: password
      },
      config
    );
    dispatch({
      type: 'LOGIN_SUCCESS',
      payload: res.data
    });
    dispatch({
      type: 'USER_FINISHED'
    });
    //dispatch(loadUser());
    if (res.data.token) {
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userid', res.data.user);
      navigate('/app/customers', { replace: true });
    } else {
      Swal.fire({
        title: 'Error!',
        text: 'Email ou mot de passe incorrect',
        icon: 'error',
        confirmButtonText: 'Cool'
      });
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

export const logout = () => async (dispatch) => {
  dispatch({
    type: 'USER_LOADING'
  });
  dispatch({
    type: 'LOGOUT'
  });
};
