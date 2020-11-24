const IncidentState = [];
const incidentReducer = (state = IncidentState, action) => {
  switch (action.type) {
    case 'GET_ALL_ZONE':
      return action.payload;
    case 'ADD_ZONE':
      return [...state, action.payload];

    default:
      return state;
  }
};

export default incidentReducer;
