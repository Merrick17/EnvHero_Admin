const EventState = [];

const eventReducer = (state = EventState, action) => {
  switch (action.type) {
    case 'GET_ALL_EVENTS':
      return action.payload;
    case 'ADD_EVENT':
      return [...state, action.payload];

    default:
      return state;
  }
};
export default eventReducer;
