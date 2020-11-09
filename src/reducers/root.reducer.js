import authReducer from './auth.reducer';
import eventReducer from './event.reducer';
import incidentReducer from './incident.reducer';
import loadingReducer from './loading.reducer';
import { combineReducers } from 'redux';
const rootReducer = combineReducers({
  authReducer,
  eventReducer,
  incidentReducer,
  loadingReducer
});

export default rootReducer;
