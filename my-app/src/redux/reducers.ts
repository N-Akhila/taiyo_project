// redux/reducers.ts
import { combineReducers } from 'redux';
import { Contact } from './types';

interface ContactState {
  contacts: Contact[];
}

const initialContactState: ContactState = {
  contacts: [],
};

const contactReducer = (state = initialContactState, action: any) => {
  switch (action.type) {
    case 'ADD_CONTACT':
      return {
        ...state,
        contacts: [...state.contacts, action.payload],
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  contact: contactReducer,
});

export default rootReducer;
