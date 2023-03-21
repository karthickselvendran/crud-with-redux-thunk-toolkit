import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getContactsFromServer,
  removeContactFromList,
  setSelectedContact,
  updateContactInList,
} from "../../redux/slices/contactsSlice";
import { Table } from "../table";
import { UpdateTask } from "../updateTask";
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

export const TaskList = () => {
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
    dispatch(updateContactInList(contact));
    setIsOpen(false);
  };

  const handleDelete = (contact) => {
    console.log("handleDelete--", contact);
    if (window.confirm("Are you sure want to delete this contact?")) {
      dispatch(removeContactFromList(contact));
    }
  };

  console.log("contactsList--", contactsList);
  return (
    <>
      {contactsList && contactsList.length ? (
        <div className="taskList">
          <h2>Task List</h2>
          <Table
            className={"taskListTable"}
            headersList={headersList}
            tableDatas={contactsList}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
          <UpdateTask
            isOpen={isOpen}
            handleClose={handleEdit}
            handleUpdate={handleUpdate}
          />
        </div>
      ) : null}
    </>
  );
};
