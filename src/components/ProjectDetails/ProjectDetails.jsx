import './ProjectDetails.css';
import Button from "../Button/Button";
import TaskInfo from "../TaskInfo/TaskInfo";
import UserCard from "../UserCard/UserCard";
import Input from "../Controls/Input/Input";
import Textarea from "../Controls/Input/Textarea";
import Modal from "../Modal/Modal";
import {useEffect, useState} from "react";
import { AddUser } from "../AddUser/AddUser";

import { createProject, addUserToProject } from "../../Hooks/Project";
import { createIssue } from "../../Hooks/Issue";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
 
// CSS Modules, react-datepicker-cssmodules.css// 
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import TaskCreation from "../TaskCreation/TaskCreation";

export default function ProjectDetails() {
    const [projectDetails, setProjectDetails] = useState({
        name: "",
        description: "",
        startDate: "",
        endDate: ""
    })
    const [tasks, setTasks] = useState([]);
    const [userList, setUserList] = useState([]);
    const [userTask, setUserTask] = useState([]);
    const [isModalOpen, setIsModalUserOpen] = useState(false);
    const [isModalTaskOpen, setIsModalTaskOpen] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    useEffect(() => {
        setProjectDetails({ ...projectDetails, startDate, endDate });
    }, [startDate, endDate]);

    const handleInputChange = ((fieldName, value) => {
        setProjectDetails(prevProject => ({
            ...prevProject,
            [fieldName]: value
        }))
    })
    const openModalUser = () => {
        setIsModalUserOpen(true);
    };

    const openModalTask = () => {
        setIsModalTaskOpen(true);
    };
    const closeModalUser = () => {
        setIsModalUserOpen(false);
    };
    const closeModalTask = () => {
        setIsModalTaskOpen(false);
    };

    const addTask = (newTask) => {
        setTasks([...tasks, newTask])
        console.log(tasks)
    }

    const addUserList = (newUser) => {
        setUserList([...userList, newUser])
        console.log('UserList', userList)
    }

    const saveProject = () => {
        console.log(tasks);
        console.log(userList);
        const { name, description, start_date, end_date } = projectDetails;

        createProject(name, description, start_date, end_date).then((res) => {
            const project = res.data;
            Promise.all(userList.map((user) => addUserToProject(project.id, user.id, user.role))).then(() => {
                tasks.map((task) => {
                    createIssue(task.name, task.description, project.id, task.dueDate, task.priority, task.assigneeId ?? null, task.status);
                });
            });
        })
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
                            {
                                userList.map((user, index) => (
                                    <UserCard key={index} name={`${user.firstName} ${user.lastName}`} role={ user.role } />
                                ))
                            }
                        </div>
                        <div className='button-block'>
                            <Button text='Add' onClick={openModalUser}/>
                        </div>
                    </div>
                    <div className='main-tasks'>
                        <h3>Tasks</h3>
                        <div className="project-details__tasks">
                            {tasks.map((item, index) => (
                                <TaskInfo key={ index } title={item.name}
                                commentsCount="3" /> ))
                            }
                        </div>
                        <div className='button-block'>
                            <Button text='Add' onClick={openModalTask}/>
                        </div>
                    </div>
                </div>
                <div className="project-save">
                    <Button text={"Save"} onClick={saveProject}/>
                </div>
            </div>
            <Modal isOpen={isModalOpen} onClose={closeModalUser}>
                <AddUser tasks={tasks} addUser={addUserList} setTasks={setTasks} userTask={userTask} closeModal={ closeModalUser } />
            </Modal>
            <Modal isOpen={isModalTaskOpen} onClose={closeModalTask}>
                <TaskCreation addTask={addTask} closeModal={closeModalTask}/>
            </Modal>
        </>
    );
};