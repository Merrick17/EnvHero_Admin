const loadingInitState = false;

const loadingReducer = (state = loadingInitState, action) => {
  switch (action.type) {
    case 'USER_LOADING':
      return true;
    case 'USER_FINISHED':
      return false;

    default:
      return state;
  }
};

export default loadingReducer;
