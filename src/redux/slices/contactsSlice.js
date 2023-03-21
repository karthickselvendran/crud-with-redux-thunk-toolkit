import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";

const initialState = {
  contactsList: [],
  selectedContact: {},
};

const contactsSlice = createSlice({
  name: "contactsSlice",
  initialState,
  reducers: {
    addContactToList: (state, action) => {
      const id = uuid();
      let contacts = { ...action.payload, id };
      state.contactsList.push(contacts);
    },
    removeContactFromList: (state, action) => {
      state.contactsList = state.contactsList.filter(
        (contact) => contact.id !== action.payload.id
      );
    },
    updateContactInList: (state, action) => {
      state.contactsList = state.contactsList.map((contact) =>
        contact.id === action.payload.id ? action.payload : contact
      );
    },
    setSelectedContact: (state, action) => {
      state.selectedContact = action.payload;
    },
  },
});

export const {
  addContactToList,
  removeContactFromList,
  updateContactInList,
  setSelectedContact,
} = contactsSlice.actions;

export default contactsSlice.reducer;
