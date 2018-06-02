import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import contacts from './contacts';

export default combineReducers({
  form: reduxFormReducer,
  contacts,
});
