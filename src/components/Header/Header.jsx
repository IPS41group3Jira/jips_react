import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Input from "../Input/Input";

import "./Header.css";

export default function Header() {
	return (
		<>
			<header>
				<Navbar>
					<Navbar.Brand href="/" className="brand">JIPS</Navbar.Brand>
					<Nav.Link href="/">Project</Nav.Link>
					<Nav.Link href="/">Tasks</Nav.Link>
					<Nav.Link href="/">Users</Nav.Link>
				</Navbar>
				<div className="header__controls">
					
				</div>
				{/* Brand */}
				{/* Navbar */}
				{/* Controls */}
			</header>
		</>
	);
};