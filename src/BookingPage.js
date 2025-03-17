import React, { useState } from "react";
import { Container, Nav, Tab, Form, Button, Row, Col } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

const BookingPage = () => {
    const [search, setSearch] = useState({
        destination: "",
        date: "",
        travelers: "2 travelers, 1 room",
        addFlight: false,
        addCar: false,
    });

    return (
        <Container className="mt-5">
            <Tab.Container defaultActiveKey="stays">
                <Nav variant="tabs" className="border-bottom mb-3">
                    <Nav.Item>
                        <Nav.Link eventKey="stays">Stays</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="flights">Flights</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="cars">Cars</Nav.Link>
                    </Nav.Item>
                    
                </Nav>

                <Tab.Content>
                    <Tab.Pane eventKey="stays">
                        <Form className="shadow-sm p-3 bg-white rounded">
                            <Row className="g-2">
                                <Col md={4}>
                                    <Form.Group>
                                        <Form.Label>Where to?</Form.Label>
                                        <Form.Control type="text" placeholder="Enter destination" value={search.destination} onChange={(e) => setSearch({ ...search, destination: e.target.value })} />
                                    </Form.Group>
                                </Col>
                                <Col md={3}>
                                    <Form.Group>
                                        <Form.Label>Dates</Form.Label>
                                        <Form.Control type="date" value={search.date} onChange={(e) => setSearch({ ...search, date: e.target.value })} />
                                    </Form.Group>
                                </Col>
                                <Col md={3}>
                                    <Form.Group>
                                        <Form.Label>Travelers</Form.Label>
                                        <Form.Control type="text" value={search.travelers} readOnly />
                                    </Form.Group>
                                </Col>
                                <Col md={2} className="d-flex align-items-end">
                                    <Button variant="primary" className="w-100">Search</Button>
                                </Col>
                            </Row>
                            <Row className="mt-3">
                                <Col>
                                    <Form.Check type="checkbox" label="Add a flight" checked={search.addFlight} onChange={(e) => setSearch({ ...search, addFlight: e.target.checked })} />
                                    <Form.Check type="checkbox" label="Add a car" checked={search.addCar} onChange={(e) => setSearch({ ...search, addCar: e.target.checked })} />
                                </Col>
                            </Row>
                        </Form>
                    </Tab.Pane>

                    <Tab.Pane eventKey="flights">
                        <Form className="shadow-sm p-3 bg-white rounded">
                            <Row className="g-2">
                                <Col md={3}>
                                    <Form.Group>
                                        <Form.Label>Leaving from</Form.Label>
                                        <Form.Control type="text" placeholder="Enter departure location" />
                                    </Form.Group>
                                </Col>
                                <Col md={3}>
                                    <Form.Group>
                                        <Form.Label>Going to</Form.Label>
                                        <Form.Control type="text" placeholder="Enter destination" />
                                    </Form.Group>
                                </Col>
                                <Col md={3}>
                                    <Form.Group>
                                        <Form.Label>Dates</Form.Label>
                                        <Form.Control type="date" />
                                    </Form.Group>
                                </Col>
                                <Col md={3} className="d-flex align-items-end">
                                    <Button variant="primary" className="w-100">Search</Button>
                                </Col>
                            </Row>
                        </Form>
                    </Tab.Pane>

                    <Tab.Pane eventKey="cars">
                        <Form className="shadow-sm p-3 bg-white rounded">
                            <Row className="g-2">
                                <Col md={3}>
                                    <Form.Group>
                                        <Form.Label>Pick-up</Form.Label>
                                        <Form.Control type="text" placeholder="Enter pick-up location" />
                                    </Form.Group>
                                </Col>
                                <Col md={3}>
                                    <Form.Group>
                                        <Form.Label>Drop-off</Form.Label>
                                        <Form.Control type="text" placeholder="Enter drop-off location" />
                                    </Form.Group>
                                </Col>
                                <Col md={2}>
                                    <Form.Group>
                                        <Form.Label>Pick-up time</Form.Label>
                                        <Form.Control type="time" />
                                    </Form.Group>
                                </Col>
                                <Col md={2}>
                                    <Form.Group>
                                        <Form.Label>Drop-off time</Form.Label>
                                        <Form.Control type="time" />
                                    </Form.Group>
                                </Col>
                                <Col md={2} className="d-flex align-items-end">
                                    <Button variant="primary" className="w-100">Search</Button>
                                </Col>
                            </Row>
                        </Form>
                    </Tab.Pane>
                </Tab.Content>
            </Tab.Container>
        </Container>
    );
};

export default BookingPage;
