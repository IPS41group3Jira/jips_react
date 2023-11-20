import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { VscAccount } from "react-icons/vsc";
import { GoGear } from "react-icons/go";

import "./Header.css";
import Modal from "../Modal/Modal";
import {useState} from "react";
import Profile from "../Profile/Profile";

export default function Header() {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const openModal = () => {
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};
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
					<span href="/login" className='header_control' onClick={openModal}><VscAccount className="icon_account"/></span>
				</div>
				{/* Brand */}
				{/* Navbar */}
				{/* Controls */}
			</header>
			<Modal isOpen={isModalOpen} onClose={closeModal}>
				<Profile />
			</Modal>
		</>
	);
};