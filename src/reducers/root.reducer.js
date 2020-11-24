import authReducer from './auth.reducer';
import eventReducer from './event.reducer';
import incidentReducer from './incident.reducer';
import loadingReducer from './loading.reducer';
import associationReducer from './association.reducer';
import userReducer from './user.reducer';
import { combineReducers } from 'redux';
const rootReducer = combineReducers({
  authReducer,
  eventReducer,
  incidentReducer,
  loadingReducer,
  associationReducer,
  userReducer
});

export default rootReducer;
