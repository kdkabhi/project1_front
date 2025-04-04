import React, { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from '../capstone navbar.png';
import "bootstrap/dist/css/bootstrap.min.css";
import './Navbar.css';
import { UserContext } from '../UserContext';

const Navbar = () => {
    const { user, setUser } = useContext(UserContext);
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();

    console.log('Navbar user:', user); // Debugging

    useEffect(() => {
        if (user) {
            fetch(`http://localhost:8080/api/isAdmin?email=${user.email}`)
                .then(response => response.json())
                .then(data => setIsAdmin(data.isAdmin))
                .catch(error => console.error('Error checking admin status:', error));
        }
    }, [user]);

    const handleLogout = () => {
        setUser(null);
        navigate('/');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm py-1"> {/* Reduced padding */}
            <div className="container d-flex align-items-center justify-content-between">
                <NavLink className="navbar-brand d-flex align-items-center" to="/">
                    <img src={logo} alt="Adventure Aware" className="navbar-logo me-2 rounded-circle" style={{ height: '40px', width: '40px' }} /> {/* Adjusted logo size */}
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
                        {isAdmin && (
                            <li className="nav-item">
                                <NavLink className="nav-link text-dark fw-semibold" to="/admin">
                                    Admin
                                </NavLink>
                            </li>
                        )}
                        <li className="nav-item">
                            <NavLink className="nav-link text-dark fw-semibold" to="/contact">
                                About Us
                            </NavLink>
                        </li>
                        {user ? (
                            <li className="nav-item d-flex align-items-center">
                                <NavLink className="nav-link text-dark fw-semibold" to="/profile">
                                    {user.name ? user.name.charAt(0).toUpperCase() + user.name.slice(1) : 'User'}
                                </NavLink>
                                <button className="btn btn-outline-danger ms-3" onClick={handleLogout}>
                                    Sign Out
                                </button>
                            </li>
                        ) : (
                            <li className="nav-item">
                                <NavLink className="nav-link text-dark fw-semibold" to="/login">
                                    Login
                                </NavLink>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;