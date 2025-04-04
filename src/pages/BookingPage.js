import React, { useState } from "react";
import { Container, Nav, Tab, Form, Button, Row, Col } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const BASE_URL = "https://test.api.amadeus.com";

const BookingPage = () => {
    const [flightOrigin, setFlightOrigin] = useState("");
    const [flightDestination, setFlightDestination] = useState("");
    const [flightDate, setFlightDate] = useState("");
    const [flights, setFlights] = useState([]);

    const [hotelCity, setHotelCity] = useState("");
    const [hotels, setHotels] = useState([]);

    const [carCity, setCarCity] = useState("");
    const [carPickupDate, setCarPickupDate] = useState("");
    const [cars, setCars] = useState([]);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [bookings, setBookings] = useState([]);

    const getToken = () => "your_access_token_here"; // Replace with token from curl

    const handleFlightSearch = async () => {
        if (!flightOrigin || !flightDestination || !flightDate) {
            setError("Please enter valid airport codes (e.g., YYZ, JFK) and a date!");
            return;
        }
        if (!flightOrigin.match(/^[A-Z]{3}$/) || !flightDestination.match(/^[A-Z]{3}$/)) {
            setError("Airport codes must be 3 uppercase letters!");
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const token = getToken();
            const response = await fetch(
                `${BASE_URL}/v2/shopping/flight-offers?originLocationCode=${flightOrigin}&destinationLocationCode=${flightDestination}&departureDate=${flightDate}&adults=1&max=5`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            const data = await response.json();
            if (!response.ok) throw new Error(data.error || "Failed to fetch flights");
            setFlights(data.data || []);
        } catch (error) {
            setError(`Failed to fetch flights: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleHotelSearch = async () => {
        if (!hotelCity) {
            setError("Please enter a valid city code (e.g., PAR, NYC)!");
            return;
        }
        if (!hotelCity.match(/^[A-Z]{3}$/)) {
            setError("City code must be 3 uppercase letters!");
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const token = getToken();
            const response = await fetch(
                `${BASE_URL}/v1/reference-data/locations/hotels/by-city?cityCode=${hotelCity}&radius=5&radiusUnit=KM`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            const data = await response.json();
            if (!response.ok) throw new Error(data.error || "Failed to fetch hotels");
            setHotels(data.data || []);
        } catch (error) {
            setError(`Failed to fetch hotels: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleCarSearch = async () => {
        if (!carCity || !carPickupDate) {
            setError("Please enter a valid city code (e.g., PAR) and pickup date!");
            return;
        }
        if (!carCity.match(/^[A-Z]{3}$/)) {
            setError("City code must be 3 uppercase letters!");
            return;
        }
        const pickup = new Date(carPickupDate);
        const today = new Date();
        if (pickup < today || pickup > new Date(today.setDate(today.getDate() + 330))) {
            setError("Pickup date must be between today and 330 days from now!");
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const token = getToken();
            const response = await fetch(
                `${BASE_URL}/v1/shopping/availability/car-rentals?cityCode=${carCity}&pickUpDate=${carPickupDate}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            const data = await response.json();
            if (!response.ok) throw new Error(data.error || "Failed to fetch cars");
            setCars(data.data || []);
        } catch (error) {
            setError(`Failed to fetch cars: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleBook = (type, item) => {
        const booking = {
            type,
            id: item.id || item.hotelId,
            details:
                type === "flight"
                    ? `${flightOrigin} to ${flightDestination} on ${flightDate} - ${item.price.total} ${item.price.currency}`
                    : type === "hotel"
                    ? `${item.name} in ${hotelCity} - $100`
                    : `${item.vehicle.name} in ${carCity} on ${carPickupDate} - ${item.price.amount} ${item.price.currencyCode}`,
            externalLink:
                type === "flight"
                    ? "https://www.example.com/book-flight"
                    : type === "hotel"
                    ? "https://www.example.com/book-hotel"
                    : "https://www.example.com/book-car",
        };
        setBookings([...bookings, booking]);
        alert(`Booking added! Visit ${booking.externalLink} to complete your ${type} booking.`);
    };

    return (
        <div>
            <Navbar user={null} />
            <Container className="mt-5">
                <Tab.Container defaultActiveKey="flights">
                    <Nav variant="tabs" className="border-bottom mb-3">
                        <Nav.Item><Nav.Link eventKey="flights">Flights</Nav.Link></Nav.Item>
                        <Nav.Item><Nav.Link eventKey="hotels">Hotels</Nav.Link></Nav.Item>
                        <Nav.Item><Nav.Link eventKey="cars">Car Rentals</Nav.Link></Nav.Item>
                    </Nav>

                    <Tab.Content>
                        <Tab.Pane eventKey="flights">
                            <Form className="shadow-sm p-3 bg-white rounded">
                                <Row className="g-2">
                                    <Col md={4}>
                                        <Form.Group>
                                            <Form.Label>Origin (IATA)</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="E.g., YYZ"
                                                value={flightOrigin}
                                                onChange={(e) => setFlightOrigin(e.target.value.toUpperCase())}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={4}>
                                        <Form.Group>
                                            <Form.Label>Destination (IATA)</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="E.g., KTM"
                                                value={flightDestination}
                                                onChange={(e) => setFlightDestination(e.target.value.toUpperCase())}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={2}>
                                        <Form.Group>
                                            <Form.Label>Date</Form.Label>
                                            <Form.Control
                                                type="date"
                                                value={flightDate}
                                                onChange={(e) => setFlightDate(e.target.value)}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={2} className="d-flex align-items-end">
                                        <Button variant="primary" className="w-100" onClick={handleFlightSearch}>
                                            Search
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>
                            {loading && <p className="mt-3">Loading flights...</p>}
                            {error && <p className="text-danger mt-3">{error}</p>}
                            {!loading && flights.length > 0 && (
                                <ul className="list-group mt-3">
                                    {flights.map((flight) => (
                                        <li key={flight.id} className="list-group-item d-flex justify-content-between align-items-center">
                                            <div>
                                                <h5>{flight.itineraries[0].segments[0].departure.iataCode} to {flight.itineraries[0].segments[0].arrival.iataCode}</h5>
                                                <p>Price: {flight.price.total} {flight.price.currency}</p>
                                            </div>
                                            <Button variant="success" onClick={() => handleBook("flight", flight)}>
                                                Book
                                            </Button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                            {!loading && flights.length === 0 && !error && <p className="mt-3">No flights found.</p>}
                        </Tab.Pane>

                        <Tab.Pane eventKey="hotels">
                            <Form className="shadow-sm p-3 bg-white rounded">
                                <Row className="g-2">
                                    <Col md={8}>
                                        <Form.Group>
                                            <Form.Label>City Code</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="E.g., PAR (Paris)"
                                                value={hotelCity}
                                                onChange={(e) => setHotelCity(e.target.value.toUpperCase())}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={4} className="d-flex align-items-end">
                                        <Button variant="primary" className="w-100" onClick={handleHotelSearch}>
                                            Search
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>
                            {loading && <p className="mt-3">Loading hotels...</p>}
                            {error && <p className="text-danger mt-3">{error}</p>}
                            {!loading && hotels.length > 0 && (
                                <ul className="list-group mt-3">
                                    {hotels.map((hotel) => (
                                        <li key={hotel.hotelId} className="list-group-item d-flex justify-content-between align-items-center">
                                            <div>
                                                <h5>{hotel.name}</h5>
                                                <p>Distance: {hotel.hotelDistance?.distance ?? "N/A"} {hotel.hotelDistance?.distanceUnit ?? ""}</p>
                                                <p>Location: {hotel.cityCode}</p>
                                            </div>
                                            <Button variant="success" onClick={() => handleBook("hotel", hotel)}>
                                                Book
                                            </Button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                            {!loading && hotels.length === 0 && !error && <p className="mt-3">No hotels found.</p>}
                        </Tab.Pane>

                        <Tab.Pane eventKey="cars">
                            <Form className="shadow-sm p-3 bg-white rounded">
                                <Row className="g-2">
                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Label>City Code</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="E.g., PAR"
                                                value={carCity}
                                                onChange={(e) => setCarCity(e.target.value.toUpperCase())}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={3}>
                                        <Form.Group>
                                            <Form.Label>Pickup Date</Form.Label>
                                            <Form.Control
                                                type="date"
                                                value={carPickupDate}
                                                onChange={(e) => setCarPickupDate(e.target.value)}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={3} className="d-flex align-items-end">
                                        <Button variant="primary" className="w-100" onClick={handleCarSearch}>
                                            Search
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>
                            {loading && <p className="mt-3">Loading cars...</p>}
                            {error && <p className="text-danger mt-3">{error}</p>}
                            {!loading && cars.length > 0 && (
                                <ul className="list-group mt-3">
                                    {cars.map((car) => (
                                        <li key={car.id} className="list-group-item d-flex justify-content-between align-items-center">
                                            <div>
                                                <h5>{car.vehicle.name}</h5>
                                                <p>Price: {car.price.amount} {car.price.currencyCode}</p>
                                            </div>
                                            <Button variant="success" onClick={() => handleBook("car", car)}>
                                                Book
                                            </Button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                            {!loading && cars.length === 0 && !error && <p className="mt-3">No cars found.</p>}
                        </Tab.Pane>
                    </Tab.Content>
                </Tab.Container>

                {bookings.length > 0 && (
                    <div className="mt-5">
                        <h3>Your Bookings</h3>
                        <ul className="list-group">
                            {bookings.map((booking, index) => (
                                <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                                    <div>{booking.details}</div>
                                    <a href={booking.externalLink} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                                        Complete Booking
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </Container>
            <Footer />
        </div>
    );
};

export default BookingPage;