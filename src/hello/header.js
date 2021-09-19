import React from "react";
import { Link } from "react-router-dom";
import "../index.css";
export default function Header() {
  return (
    <header className="App-header">
      <Link to="/auth">
        <button className="my-buttons-header primary">Signup</button>
      </Link>
      <Link to="/auth">
        <button className="my-buttons-header primary">Login</button>
      </Link>
    </header>
  );
}
