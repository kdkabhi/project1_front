import React from "react";
import { Link } from "react-router-dom";
import logo from './capstone logo.png';
import "bootstrap/dist/css/bootstrap.min.css";
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import './AdventureAwareHome.css'; // Import the CSS file for additional styles

const AdventureAwareHome = ({ packages }) => {
  return (
    <div>
      {/* Header */}
      <div className="container" style={{ maxWidth: '1200px', padding: 0 }}>
        <header className="text-white text-center py-5" style={{ height: '500px', width: '100%', position: 'relative' }}>
          <video autoPlay loop muted style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0 }}>
            <source src="/capstone1 video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="d-flex flex-column justify-content-center align-items-center h-100 text-white" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)', position: 'relative', zIndex: 1 }}>
            <h1 className="display-4 fw-bold" style={{ fontFamily: "'Roboto', sans-serif", fontSize: '3rem' }}>
              Explore Ontario's Best Travel Destinations
            </h1>
            <p className="lead" style={{ fontFamily: "'Open Sans', sans-serif", fontSize: '1.25rem' }}>
              Your gateway to unforgettable adventures
            </p>
          </div>
        </header>
      </div>

      {/* Display Packages */}
      <div className="container mt-5">
        <h2 className="text-center fw-bold">Our Packages</h2>
        <div className="row d-flex justify-content-center">
          {packages.map((pkg) => (
            <div key={pkg.id} className="col-md-4 mb-4 d-flex align-items-stretch">
              <div className="card shadow-sm border-0 w-100" style={{ height: "550px" }}>
                <img src={pkg.image} className="card-img-top" alt={pkg.name} style={{ height: "250px", objectFit: "cover" }} />
                <div className="card-body text-center">
                  <h5 className="card-title fw-bold">{pkg.name}</h5>
                  <p className="card-text">{pkg.description}</p>
                  <p><strong>Price:</strong> {pkg.price}</p>
                  <p><strong>Duration:</strong> {pkg.days}</p>
                  <p><strong>Date:</strong> {pkg.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdventureAwareHome;