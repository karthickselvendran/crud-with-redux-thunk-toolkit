import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./style.css";

const initialState = {
  name: "",
  phoneNumber: "",
};

export const UpdateContact = (props) => {
  const { isOpen = false, handleUpdate = () => {} } = props;
  const { selectedContact } = useSelector((state) => state.contactsReducer);
  const [userDetails, setUserDetails] = useState(initialState);

  useEffect(() => {
    if (selectedContact && Object.keys(selectedContact).length) {
      setUserDetails({ ...selectedContact });
    }
  }, [selectedContact]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setUserDetails({
      ...userDetails,
      [id]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(userDetails);
    if (!userDetails.name || !userDetails.phoneNumber) {
      alert("Please enter both name and phone number");
      return;
    }
    handleUpdate(userDetails);
    setUserDetails(initialState);
  };

  const { name = "", phoneNumber = "" } = userDetails;
  console.log("userDetails--", userDetails);
  return (
    <>
      {isOpen && (
        <>
          <div className="modalOverlay"></div>
          <div className="updateContact">
            <h1>UpdateContact</h1>
            <br />
            <div>
              <label>Name</label>
              <br />
              <input
                type="text"
                id="name"
                value={name}
                onChange={handleChange}
                autoComplete="off"
              />
            </div>
            <br />
            <div>
              <label>Phone Number</label>
              <br />
              <input
                type="number"
                id="phoneNumber"
                value={phoneNumber}
                onChange={handleChange}
                autoComplete="off"
              />
            </div>
            <br />
            <div className="btn">
              <button onClick={handleSubmit}>Update</button>
            </div>
          </div>
        </>
      )}
    </>
  );
};
