import React from "react";
import { useSelector } from "react-redux";
import "./style.css";

export const Header = () => {
  const { contactsList, error } = useSelector((state) => state.contactsReducer);
  return (
    <div className="header">
      <h1>Contacts Management</h1>
      <p>{`Number of Contacts: ${contactsList && contactsList.length}`}</p>
      {error && <p className="error">{error}</p>}
    </div>
  );
};
