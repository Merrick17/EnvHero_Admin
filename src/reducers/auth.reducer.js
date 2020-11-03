const initUserSate = {
  fullname: '',
  isAdmin: '',
  auth: false,
  id: ''
};

const authReducer = (state = initUserSate, action) => {
  switch (action.type) {
    case 'AUTH_USER':
      return action.payload;
      break;

    default:
      return state;
  }
};

export default authReducer;
