const associationsInitState = [];

const userReducer = (state = associationsInitState, action) => {
  switch (action.type) {
    case 'GET_ALL_USERS':
      return action.payload;
    case 'ADD_USER':
      return [...state, action.payload];
    case 'DELETE_USER':
      return [...state, action.payload];
    default:
      return state;
  }
};

export default userReducer;
