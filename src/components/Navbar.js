import React from "react";
import { NavLink } from "react-router-dom";
import logo from '../capstone logo.png';
import "bootstrap/dist/css/bootstrap.min.css";
import './Navbar.css'; // Import custom CSS file

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm py-2">
      <div className="container d-flex align-items-center justify-content-between">
        <NavLink className="navbar-brand d-flex align-items-center" to="/">
          <img src={logo} alt="Adventure Aware" className="navbar-logo me-2 rounded-circle" />
        </NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink className="nav-link text-dark fw-semibold" to="/#destinations">
                Destinations
              </NavLink>
            </li>
            
            <li className="nav-item">
              <NavLink className="nav-link text-dark fw-semibold" to="/booking">
                Booking
              </NavLink>
            </li>
            
            <li className="nav-item">
              <NavLink className="nav-link text-dark fw-semibold" to="/admin">
                Admin
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link text-dark fw-semibold" to="/login">
                Login
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link text-dark fw-semibold" to="/contact">
                Contact
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;