import './ProjectDetails.css';
import Button from "../Button/Button";
import TaskInfo from "../TaskInfo/TaskInfo";
import UserCard from "../UserCard/UserCard";
import Input from "../Controls/Input/Input";
import Textarea from "../Controls/Input/Textarea";
import Modal from "../Modal/Modal";
import {useState} from "react";
import {AddUser} from "../AddUser/AddUser";

export default function ProjectDetails() {
    const [projectDetails, setProjectDetails] = useState({
        name: "",
        description: "",
        start_date: "",
        end_date: ""
    })
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleInputChange = ((fieldName, value) => {
        setProjectDetails(prevProject => ({
            ...prevProject,
            [fieldName]: value
        }))
    })
    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const saveProject = () => {
        console.log(projectDetails)
    }
    return (
        <>
            <div className='project-details-block'>
                <div className="project-header">
                    <div>
                        <Input className=' project-name' placeholder="Project Name"
                               value={projectDetails.name}
                               onChange={(e) => handleInputChange("name", e.target.value)}
                        ></Input>
                    </div>
                    <div className="project-dates">
                        <label>Start</label>
                        <div>
                            <Input placeholder="Start"
                                   value={projectDetails.start_date}
                                   onChange={(e) => handleInputChange("start_date", e.target.value)}
                            />
                        </div>
                        <label>End</label>
                        <div>
                            <Input placeholder="End"
                                   value={projectDetails.end_date}
                                   onChange={(e) => handleInputChange("end_date", e.target.value)}
                            />
                        </div>

                    </div>
                </div>
                <Textarea className=' project-info' rows="5" placeholder="Description" value={projectDetails.description}
                          onChange={(e) => handleInputChange("description", e.target.value)}
                >
                </Textarea>
                <div className='project-details-block__main'>
                    <div>
                        <h3>Users</h3>
                        <div className='project-details__tasks'>
                            <UserCard name='Emily Smith' role='role'/>
                            <div className='button-block'>
                                <Button text='Add' onClick={openModal}/>
                            </div>
                        </div>
                    </div>
                    <div className='main-tasks'>
                        <h3>Tasks</h3>
                        <div className="project-details__tasks">
                            <TaskInfo
                                title="Create new task"
                                status="New"
                                commentsCount={3}
                                createdTime="10 hours"
                            />
                            <TaskInfo
                                title="Create new task"
                                status="New"
                                commentsCount={3}
                                createdTime="10 hours"
                            />
                            <div className='button-block'>
                                <Button text='Add'/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="project-save">
                    <Button text={"Save"} onClick={saveProject}/>
                </div>
            </div>
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <AddUser/>
            </Modal>
        </>
    );
};