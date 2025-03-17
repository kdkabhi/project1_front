import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const AdminDashboard = ({ packages, setPackages }) => {
  const [newPackage, setNewPackage] = useState({
    name: "",
    price: "",
    days: "",
    date: "",
    description: "",
    image: "",
  });

  const [editPackage, setEditPackage] = useState(null);

  const handleAddPackage = () => {
    setPackages([...packages, { ...newPackage, id: Date.now() }]);
    setNewPackage({ name: "", price: "", days: "", date: "", description: "", image: "" });
  };

  const handleDeletePackage = (id) => {
    setPackages(packages.filter(pkg => pkg.id !== id));
  };

  const handleUpdatePackage = () => {
    setPackages(packages.map(pkg => (pkg.id === editPackage.id ? editPackage : pkg)));
    setEditPackage(null);
  };

  const handleEditPackage = (pkg) => {
    setEditPackage(pkg);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setNewPackage({ ...newPackage, image: reader.result });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleEditImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setEditPackage({ ...editPackage, image: reader.result });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>

      <div className="container mt-5">
        <h2 className="text-center fw-bold">Admin Dashboard - Manage Packages</h2>
        
        <div className="mb-4">
          <h4>Add New Package</h4>
          <input type="text" className="form-control mb-2" placeholder="Package Name" value={newPackage.name} onChange={(e) => setNewPackage({ ...newPackage, name: e.target.value })} />
          <input type="text" className="form-control mb-2" placeholder="Price" value={newPackage.price} onChange={(e) => setNewPackage({ ...newPackage, price: e.target.value })} />
          <input type="text" className="form-control mb-2" placeholder="Duration" value={newPackage.days} onChange={(e) => setNewPackage({ ...newPackage, days: e.target.value })} />
          <input type="date" className="form-control mb-2" value={newPackage.date} onChange={(e) => setNewPackage({ ...newPackage, date: e.target.value })} />
          <textarea className="form-control mb-2" placeholder="Description" value={newPackage.description} onChange={(e) => setNewPackage({ ...newPackage, description: e.target.value })}></textarea>
          <input type="file" className="form-control mb-2" onChange={handleImageChange} />
          <button className="btn btn-success" onClick={handleAddPackage}>Add Package</button>
        </div>
        
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
                  <button className="btn btn-danger mt-2" onClick={() => handleDeletePackage(pkg.id)}>Delete</button>
                  <button className="btn btn-primary mt-2 ms-2" onClick={() => handleEditPackage(pkg)}>Update</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for editing the package */}
        {editPackage && (
          <div className="modal fade show" style={{ display: 'block' }} id="editPackageModal" tabIndex="-1" aria-labelledby="editPackageModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="editPackageModalLabel">Edit Package</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setEditPackage(null)}></button>
                </div>
                <div className="modal-body">
                  <input type="text" className="form-control mb-2" placeholder="Package Name" value={editPackage.name} onChange={(e) => setEditPackage({ ...editPackage, name: e.target.value })} />
                  <input type="text" className="form-control mb-2" placeholder="Price" value={editPackage.price} onChange={(e) => setEditPackage({ ...editPackage, price: e.target.value })} />
                  <input type="text" className="form-control mb-2" placeholder="Duration" value={editPackage.days} onChange={(e) => setEditPackage({ ...editPackage, days: e.target.value })} />
                  <input type="date" className="form-control mb-2" value={editPackage.date} onChange={(e) => setEditPackage({ ...editPackage, date: e.target.value })} />
                  <textarea className="form-control mb-2" placeholder="Description" value={editPackage.description} onChange={(e) => setEditPackage({ ...editPackage, description: e.target.value })}></textarea>
                  <input type="file" className="form-control mb-2" onChange={handleEditImageChange} />
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => setEditPackage(null)}>Close</button>
                  <button type="button" className="btn btn-primary" onClick={handleUpdatePackage}>Update Package</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    
    </div>
  );
};

export default AdminDashboard;