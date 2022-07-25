import React, { useState } from "react";
import { Button } from "../button/Button";
import { MenuItems } from "./MenuItems";
import { Link } from "react-router-dom";
import "./Navbar.css";
import Modal from "../signIn/Modal";

export const Navbar = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const state = { clicked: false };

  return (
    <nav className="NavbarItems">
      <Link to="/">
        <h1 className="navbar-logo">
          My Movie
          <i className="fas fa-tv"></i>
        </h1>
      </Link>

      <div className="searchBox">
        <i className="fas fa-search"></i>

        <input className="searchInput" placeholder="Search Movie\Serie ..." />
      </div>

      <ul className={state.clicked ? "nav-menu active" : "nav-menu"}>
        {MenuItems.map((item, index) => {
          return (
            <li key={index}>
              <Link className={item.cName} to={item.url}>
                {item.title}
              </Link>
            </li>
          );
        })}
      </ul>

      <Button
        onClick={() => {
          setModalOpen(true);
        }}
      >
        Sign In
      </Button>

      {modalOpen && <Modal setOpenModal={setModalOpen} />}
    </nav>
  );
};

export default Navbar;
