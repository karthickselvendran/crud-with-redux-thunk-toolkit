import { createSlice } from "@reduxjs/toolkit";
import {
  getContactsFromServer,
  addContactToServer,
  updateContactToServer,
  removeContactFromServer,
} from "../actions/contacts";

const initialState = {
  contactsList: [],
  selectedContact: null,
  isLoading: false,
  hasError: false,
};

const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    setSelectedContact: (state, action) => {
      state.selectedContact = action.payload;
    },
    removeContactFromList: (state, action) => {
      state.contactsList = state.contactsList.filter(
        (contact) => contact.id !== action.payload.id
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getContactsFromServer.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(getContactsFromServer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.hasError = false;
        state.contactsList = action.payload;
      })
      .addCase(getContactsFromServer.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
      })
      .addCase(addContactToServer.fulfilled, (state, action) => {
        state.contactsList.push(action.payload);
      })
      .addCase(updateContactToServer.fulfilled, (state, action) => {
        console.log("action--", action);
        state.contactsList = state.contactsList.map((contact) =>
          contact.id === action.payload.id ? action.payload : contact
        );
        state.selectedContact = null;
      })
      .addCase(removeContactFromServer.fulfilled, (state, action) => {
        state.contactsList = state.contactsList.filter(
          (contact) => contact.id !== action.payload.id
        );
        state.selectedContact = null;
      });
  },
});

export const {
  setSelectedContact,
  removeContactFromList,
} = contactsSlice.actions;

export default contactsSlice.reducer;
