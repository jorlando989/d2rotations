import React, { FC } from 'react';
import './styles/header.css';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const Header: FC = () => {
    return (
        <Navbar bg="dark" variant="dark" fixed="top" className="nav">
            <Container fluid>
                <Navbar.Brand href="/">
                    <img
                        src="../destinyapilogoTransparent.png"
                        width="30"
                        height="30"
                        className=""
                        alt="React Bootstrap logo"
                    /> d2Rotations
                </Navbar.Brand>
                <Nav className="me-auto navHeader">
                    <Nav.Link href="/weekly">Weekly</Nav.Link>
                    <Nav.Link href="/daily">Daily</Nav.Link>
                    <Nav.Link href="/nightfall">Nightfall</Nav.Link>
                    <Nav.Link href="/raiddungeon">Raid and Dungeon</Nav.Link>
                    {/* <Nav.Link href="/other">Other Activities</Nav.Link> */}
                    <Nav.Link href="/calendar">Calendar</Nav.Link>
                </Nav>
            </Container>
      </Navbar>
    )
};

export default Header;