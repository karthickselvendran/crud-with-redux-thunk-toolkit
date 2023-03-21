import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addContactToList } from "../../redux/slices/contactsSlice";
import "./style.css";

const initialState = {
  name: "",
  phoneNumber: "",
};

export const AddTask = () => {
  const dispatch = useDispatch();
  const [userDetails, setUserDetails] = useState(initialState);

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
    dispatch(addContactToList(userDetails));
    setUserDetails(initialState);
  };

  const { name = "", phoneNumber = "" } = userDetails;
  //   console.log("userDetails--", userDetails);
  return (
    <div className="addContactCard">
      <h2>Add Contact</h2>
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
      <div className="btn">
        <button onClick={(e) => handleSubmit(e)}>Save</button>
      </div>
    </div>
  );
};
