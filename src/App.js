import React from "react";
import { Header, AddTask, TaskList } from "./components";
import "./App.css";

function App() {
  return (
    <div>
      <Header />
      <AddTask />
      <TaskList />
    </div>
  );
}

export default App;
