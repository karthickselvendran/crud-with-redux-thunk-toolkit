import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getContactsFromServer,
  removeContactFromList,
  removeContactFromServer,
  setSelectedContact,
  updateContactsToServer,
} from "../../redux/slices/contactsSlice";
import { Table } from "../table";
import { UpdateContact } from "../updateContact";
import "./style.css";

const headersList = [
  {
    key: "s.no",
    value: "S.No",
  },
  {
    key: "name",
    value: "Name",
  },
  {
    key: "phoneNumber",
    value: "Phone Number",
  },
  {
    key: "action",
    value: "Action",
  },
];

export const ContactList = () => {
  const dispatch = useDispatch();
  const { contactsList = [] } = useSelector((state) => state.contactsReducer);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    dispatch(getContactsFromServer());
  }, []);

  const handleEdit = (contact) => {
    console.log("handleEdit--", contact);
    dispatch(setSelectedContact(contact));
    setIsOpen(true);
  };

  const handleUpdate = (contact) => {
    console.log("handleUpdate--", contact);
    dispatch(updateContactsToServer(contact));
    setIsOpen(false);
  };

  const handleDelete = (contact) => {
    console.log("handleDelete--", contact);
    if (window.confirm("Are you sure want to delete this contact?")) {
      dispatch(removeContactFromServer(contact))
        .unwrap()
        .then(() => dispatch(removeContactFromList(contact)));
    }
  };

  console.log("contactsList--", contactsList);
  return (
    <>
      {contactsList && contactsList.length ? (
        <div className="contactsList">
          <h2>Contacts List</h2>
          <Table
            className={"contactsListTable"}
            headersList={headersList}
            tableDatas={contactsList}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
          <UpdateContact
            isOpen={isOpen}
            handleClose={handleEdit}
            handleUpdate={handleUpdate}
          />
        </div>
      ) : null}
    </>
  );
};
