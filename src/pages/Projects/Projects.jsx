import './Projects.css'
import Header from "../../components/Header/Header";
import ProjectCard from "../../components/ProjectCard/ProjectCard";
import {Container} from "react-bootstrap";
import useAuth from "../../Hooks/User";
import {useEffect, useState} from "react";

export default function Projects() {
    const { getListProjects } = useAuth();
    const [projects, setProjects] = useState(null);
    useEffect(() => {
        console.log(2)
        getListProjects().then((response) => {
            setProjects(response.data);
        }).catch((error) => {
            console.error("err")
        });
        console.log(projects);
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
                    </div>
                </Container>
            </main>
        </>
    )
}