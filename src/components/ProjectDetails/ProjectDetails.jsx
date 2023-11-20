import './ProjectDetails.css';
import Button from "../Button/Button";
import TaskInfo from "../TaskInfo/TaskInfo";
import UserCard from "../UserCard/UserCard";
import Input from "../Controls/Input/Input";
import Textarea from "../Controls/Input/Textarea";
import Modal from "../Modal/Modal";
import {useState} from "react";
import { AddUser } from "../AddUser/AddUser";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
 
// CSS Modules, react-datepicker-cssmodules.css// 
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

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
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
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
                        <label>Project Name</label>
                        <Input className=' project-name' placeholder="Project Name"
                               value={projectDetails.name}
                               onChange={(e) => handleInputChange("name", e.target.value)}
                        ></Input>
                    </div>
                    <div className="project-dates">
                        <div>
                            <label>Start</label>
                            <DatePicker selected={ startDate } className="input" placeholderText="Start" onChange={(date) => setStartDate(date)}/>
                        </div>
                        <div>
                            <label>End</label>
                            <DatePicker selected={ endDate } className="input" placeholderText="End" onChange={(date) => setEndDate(date)}/>
                        </div>
                    </div>
                </div>
                <div>
                    <label>Description</label>
                    <Textarea className=' project-info' rows="5" placeholder="Description" value={projectDetails.description}
                            onChange={(e) => handleInputChange("description", e.target.value)}></Textarea>
                </div>
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