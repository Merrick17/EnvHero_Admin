const associationsInitState = [];

const userReducer = (state = associationsInitState, action) => {
  switch (action.type) {
    case 'GET_ALL_USERS':
      let result = action.payload.filter((elm) => elm.isAssociation == false);
      return result;
    case 'ADD_USER':
      return [...state, action.payload];
    case 'DELETE_USER':
      return [...state, action.payload];
    default:
      return state;
  }
};

export default userReducer;
