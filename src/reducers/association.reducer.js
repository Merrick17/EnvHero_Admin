const associationsInitState = [];

const associationReducer = (state = associationsInitState, action) => {
  switch (action.type) {
    case 'GET_ALL_ASSOCIATIONS':
      return action.payload;
      break;
    case 'ADD_ASSOCIATION':
      return [...state, action.payload];
      break;
    default:
      return state;
  }
};

export default associationReducer;
