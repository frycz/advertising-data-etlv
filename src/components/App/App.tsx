import React from "react";
import "./App.scss";
import Dashboard from "../Dashboard";

const App: React.FC = () => {
  return (
    <div className="app">
      <div className="app__container">
        <Dashboard />
      </div>
    </div>
  );
};

export default App;
