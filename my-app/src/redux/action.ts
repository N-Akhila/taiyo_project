import { Contact } from './types';

export const addContact = (contact: Contact) => ({
  type: 'ADD_CONTACT',
  payload: contact,
});