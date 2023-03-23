import React from "react";
import { Header, AddContact, ContactList } from "./components";
import "./App.css";

function App() {
  return (
    <div>
      <Header />
      <AddContact />
      <ContactList />
    </div>
  );
}

export default App;
