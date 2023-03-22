import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";

const initialState = {
  contactsList: [],
  selectedContact: {},
  isLoading: false,
  error: "",
};

// GET

export const getContactsFromServer = createAsyncThunk(
  "contacts/getContactsFromServer",
  async (_, { rejectWithValue }) => {
    const response = await fetch("http://localhost:8000/contactsReducer");
    if (response.ok) {
      const jsonResponse = await response.json();
      return jsonResponse;
    } else {
      console.log("response--", response);
      return rejectWithValue({ error: "No contacts found" });
    }
  }
);

// POST

export const addContactsToServer = createAsyncThunk(
  "contacts/addContactsToServer",
  async (contact, { rejectWithValue }) => {
    let options = {
      method: "POST",
      body: JSON.stringify(contact),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    };
    const response = await fetch(
      "http://localhost:8000/contactsReducer",
      options
    );
    if (response.ok) {
      const jsonResponse = await response.json();
      return jsonResponse;
    } else {
      console.log("response--", response);
      return rejectWithValue({ error: "Contact Not Added" });
    }
  }
);

// PATCH

export const updateContactsToServer = createAsyncThunk(
  "contacts/updateContactsToServer",
  async (contact, { rejectWithValue }) => {
    let options = {
      method: "PATCH",
      body: JSON.stringify(contact),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    };
    const response = await fetch(
      "http://localhost:8000/contactsReducer" + "/" + contact.id,
      options
    );
    if (response.ok) {
      const jsonResponse = await response.json();
      return jsonResponse;
    } else {
      console.log("response--", response);
      return rejectWithValue({ error: "Contact Not Updated" });
    }
  }
);

// DELETE

export const removeContactFromServer = createAsyncThunk(
  "contacts/removeContactFromServer",
  async (contact, { rejectWithValue }) => {
    let options = {
      method: "DELETE",
      body: JSON.stringify(contact),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    };
    const response = await fetch(
      "http://localhost:8000/contactsReducer" + "/" + contact.id,
      options
    );
    if (response.ok) {
      const jsonResponse = await response.json();
      return jsonResponse;
    } else {
      console.log("response--", response);
      return rejectWithValue({ error: "Contact Not Deleted" });
    }
  }
);

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
  extraReducers: (builder) => {
    builder
      .addCase(getContactsFromServer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getContactsFromServer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
        state.contactsList = action.payload;
      })
      .addCase(getContactsFromServer.rejected, (state, action) => {
        console.log(action.payload);
        state.error =
          action.payload && action.payload.error
            ? action.payload.error
            : "Error";
        state.isLoading = false;
      })
      .addCase(addContactsToServer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addContactsToServer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
        state.contactsList.push(action.payload);
      })
      .addCase(addContactsToServer.rejected, (state, action) => {
        console.log(action.payload);
        state.error =
          action.payload && action.payload.error
            ? action.payload.error
            : "Error";
        state.isLoading = false;
      })
      .addCase(updateContactsToServer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateContactsToServer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
        state.contactsList = state.contactsList.map((contact) =>
          contact.id === action.payload.id ? action.payload : contact
        );
      })
      .addCase(updateContactsToServer.rejected, (state, action) => {
        console.log(action.payload);
        state.error =
          action.payload && action.payload.error
            ? action.payload.error
            : "Error";
        state.isLoading = false;
      })
      .addCase(removeContactFromServer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeContactFromServer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
      })
      .addCase(removeContactFromServer.rejected, (state, action) => {
        console.log(action.payload);
        state.error =
          action.payload && action.payload.error
            ? action.payload.error
            : "Error";
        state.isLoading = false;
      });
  },
});

export const {
  addContactToList,
  removeContactFromList,
  updateContactInList,
  setSelectedContact,
} = contactsSlice.actions;

export default contactsSlice.reducer;
