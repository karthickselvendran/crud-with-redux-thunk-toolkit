import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const api = "http://localhost:8000/contactsReducer";

export const removeContactFromList = (contact) => ({
  type: "contacts/removeContactFromList",
  payload: contact,
});

export const setSelectedContact = (contact) => ({
  type: "contacts/setSelectedContact",
  payload: contact,
});

export const getContactsFromServer = createAsyncThunk(
  "contacts/getContactsFromServer",
  async () => {
    const response = await axios.get(api);
    return response.data;
  }
);

export const addContactToServer = createAsyncThunk(
  "contacts/addContactToServer",
  async (contact) => {
    const response = await axios.post(api, contact);
    return response.data;
  }
);

export const updateContactToServer = createAsyncThunk(
  "contacts/updateContactToServer",
  async (contact) => {
    const response = await axios.put(`${api}/${contact.id}`, contact);
    return response.data;
  }
);

export const removeContactFromServer = createAsyncThunk(
  "contacts/removeContactFromServer",
  async (contact) => {
    await axios.delete(`${api}/${contact.id}`);
    return contact;
  }
);
