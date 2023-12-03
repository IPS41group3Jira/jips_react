import './ProjectCard.css'
import Modal from "../Modal/Modal";
import React, {useEffect, useState} from "react";
import ProjectDetails from "../ProjectDetails/ProjectDetails";
import {getProjectById, getProjectUsers} from "../../Hooks/Project";

export default function ProjectCard({project, onUpdate}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        if (project) {
            getProjectUsers(project.id).then((resp) => {
                setUsers(resp.data)
            })
        }
    }, [project])

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        onUpdate()
        setIsModalOpen(false);
    };
    return (
        <>
            <div className="project-card">
                <div className="project-card_main">
                    <label>{project.name}</label>
                    <span>{users.length} users in project</span>
                </div>
                <div className="project-card_detail">
                    <span onClick={openModal}>Details</span>
                </div>
            </div>
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <ProjectDetails projectInfo={project} onClose={closeModal}/>
            </Modal>
        </>
    )
}