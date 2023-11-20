import './ProjectCard.css'
import TaskCreation from "../TaskCreation/TaskCreation";
import Modal from "../Modal/Modal";
import React, {useState} from "react";
import ProjectDetails from "../ProjectDetails/ProjectDetails";

export default function ProjectCard({project}) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
    return (
        <>
            <div className="project-card">
                <div className="project-card_main">
                    <label>{project.name}</label>
                    <span>15 users in project</span>
                </div>
                <div className="project-card_detail">
                    <span onClick={openModal}>Details {project.id}</span>
                </div>
            </div>
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <ProjectDetails />
            </Modal>
        </>
    )
}