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
					<Nav.Link href="/">New Task</Nav.Link>
					<Nav.Link href="/">Project</Nav.Link>
					<Nav.Link href="/">Dashboards</Nav.Link>
					<Nav.Link href="/">Teams</Nav.Link>
					<Nav.Link href="/">Messages</Nav.Link>
				</Navbar>
				<div className="header__controls">
					<Input placeholder="Search for project" />
				</div>
				{/* Brand */}
				{/* Navbar */}
				{/* Controls */}
			</header>
		</>
	);
};