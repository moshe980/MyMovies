import React from "react";
import "./Modal.css";
import { Button } from "../button/Button";

function Modal({ setOpenModal }) {
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            X
          </button>
        </div>

        <div className="main">
          <div className="sub-main">
            <div>
              <div>
                <h1>Sign In</h1>
                <div>
                  <input type="text" placeholder="email" className="name" />
                </div>
              </div>
              <div className="login-button">
                <Button>Login</Button>
              </div>

              <p className="link">
                <i className="sub-link"> Sign Up</i>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
