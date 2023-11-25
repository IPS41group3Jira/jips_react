import './Projects.css'
import Header from "../../components/Header/Header";
import ProjectCard from "../../components/ProjectCard/ProjectCard";
import {Container} from "react-bootstrap";
import useAuth from "../../Hooks/User";
import React, {useEffect, useState} from "react";
import Modal from "../../components/Modal/Modal";
import TaskCreation from "../../components/TaskCreation/TaskCreation";
import Button from "../../components/Button/Button";
import ProjectDetails from "../../components/ProjectDetails/ProjectDetails";

export default function Projects() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };


    const { getListProjects } = useAuth();
    const [projects, setProjects] = useState(null);
    useEffect(() => {
        getListProjects().then((response) => {
            setProjects(response.data);
        }).catch((error) => {
            console.error(error)
        });
    }, []);
    return (
        <>
            <Header/>
            <main>
                <Container className="d-flex justify-content-center">
                    <div className="projects-list">
                        {
                            projects &&
                            projects.map((project) => (
                                <ProjectCard key={project.id} project={project} />
                            ))
                        }
                        <div className="btn_project">
                            <Button text={"CreateProject"}  onClick={openModal}/>
                        </div>
                    </div>
                </Container>
            </main>
            <Modal isOpen={isModalOpen} onClose={ closeModal }>
                <ProjectDetails onClose={ closeModal } projectInfo={null}/>
            </Modal>
        </>
    )
}