import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { VscAccount } from "react-icons/vsc";
import { GoGear } from "react-icons/go";

import "./Header.css";

export default function Header() {
	return (
		<>
			<header>
				<Navbar>
					<Navbar.Brand href="/" className="brand">JIPS</Navbar.Brand>
					<Nav.Link href="/projects">Project</Nav.Link>
					<Nav.Link href="/">Tasks</Nav.Link>
					<Nav.Link href="/users">Users</Nav.Link>
				</Navbar>
				<div className="header__controls">
					<a href="/login" className='header_control'><VscAccount className="icon_account"/></a>
				</div>
				{/* Brand */}
				{/* Navbar */}
				{/* Controls */}
			</header>
		</>
	);
};