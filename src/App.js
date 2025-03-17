import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdventureAwareHome from './AdventureAwareHome';
import AdminDashboard from './AdminDashboard';
import Login from './Login';
import Signup from './SignUpPage';
import BookingPage from './BookingPage';
import Contact from './Contact';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import niagaraFalls from './niagara_falls.jpg';
import algonquin from './algonquin.jpg';
import toronto from './toronto.jpg';

const App = () => {
    const [user, setUser] = useState(null);
    const [packages, setPackages] = useState([
        {
            id: 1,
            name: "Niagara Falls Adventure",
            price: "$299",
            days: "3 Days / 2 Nights",
            date: "April 15, 2025",
            description: "Experience the breathtaking Niagara Falls with boat tours, wineries, and scenic views.",
            image: niagaraFalls,
        },
        {
            id: 2,
            name: "Algonquin Park Wilderness",
            price: "$249",
            days: "4 Days / 3 Nights",
            date: "May 10, 2025",
            description: "Enjoy camping, canoeing, and wildlife in Ontario’s most famous provincial park.",
            image: algonquin,
        },
        {
            id: 3,
            name: "Toronto City Experience",
            price: "$199",
            days: "2 Days / 1 Night",
            date: "June 5, 2025",
            description: "Explore the CN Tower, Royal Ontario Museum, and vibrant city life of Toronto.",
            image: toronto,
        },
    ]);

    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<AdventureAwareHome packages={packages} />} />
                <Route path="/admin" element={<AdminDashboard packages={packages} setPackages={setPackages} />} />
                <Route path="/login" element={<Login setUser={setUser} />} /> {/* Pass setUser as a prop */}
                <Route path="/signup" element={<Signup setUser={setUser} />} /> {/* Pass setUser as a prop */}
                <Route path="/booking" element={<BookingPage />} />
                <Route path="/contact" element={<Contact />} />
            </Routes>
            <Footer />
        </Router>
    );
};

export default App;