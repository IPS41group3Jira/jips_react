import './ProjectDetails.css';
import Button from "../Button/Button";
import TaskInfo from "../TaskInfo/TaskInfo";
import UserCard from "../UserCard/UserCard";
import Input from "../Controls/Input/Input";
import Textarea from "../Controls/Input/Textarea";
import Modal from "../Modal/Modal";
import {useEffect, useState} from "react";
import {AddUser} from "../AddUser/AddUser";

import {createProject, addUserToProject, getProjectUsers, deleteUserProject,} from "../../Hooks/Project";
import {createIssue, getIssueByProject} from "../../Hooks/Issue";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// CSS Modules, react-datepicker-cssmodules.css// 
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import TaskCreation from "../TaskCreation/TaskCreation";

export default function ProjectDetails({onClose, projectInfo}) {
    const [projectDetails, setProjectDetails] = useState(projectInfo ?? {
        name: "",
        description: "",
    });

    const [tasks, setTasks] = useState([]);
    const [selectTask, setSelectTask] = useState({});
    const [selectUser, setSelectUser] = useState(null);
    const [userList, setUserList] = useState([]);
    const [isModalOpen, setIsModalUserOpen] = useState(false);
    const [isModalTaskOpen, setIsModalTaskOpen] = useState(false);

    const [startDate, setStartDate] = useState(() => {
        return projectInfo ? new Date(projectInfo.startDate) : new Date()
    });
    const [endDate, setEndDate] = useState(() => {
        return projectInfo ? new Date(projectInfo.endDate) : new Date()
    });

    const handleInputChange = ((fieldName, value) => {
        setProjectDetails(prevProject => ({
            ...prevProject,
            [fieldName]: value
        }))
    })
    const openModalUser = (user) => {
        setSelectUser(user);
        console.log(selectUser)
        setIsModalUserOpen(true);
    };

    const openModalTask = (task) => {
        setSelectTask(task)
        setIsModalTaskOpen(true);
    };
    const closeModalUser = () => {
        setSelectUser(null);
        setIsModalUserOpen(false);
    };
    const closeModalTask = () => {
        setIsModalTaskOpen(false);
        setSelectTask(null);
    };

    const addTask = (newTask) => {
        setTasks([...tasks, newTask])
        console.log(tasks)
    }

    const addUserList = (newUser) => {
        //check copy
        const userIndex = userList.findIndex(exUser => exUser.id === newUser.id);

        if (userIndex !== -1) {
            const updateUserList = userList.map((user, index) => (index === userIndex ? newUser : user));
            setUserList(updateUserList);
            console.log(updateUserList);
        } else {
            setUserList([...userList, newUser]);
        }
        console.log('UserList', userList)
    }
    const deleteUser = (user) => {
        let isError = false;
        if (user.role.id) {
            deleteUserProject(projectInfo.id, user.id).then().catch((error) => {
                isError = true;
            })
        }
        if (!isError) {
            const updateUserList = userList.filter(userList => userList.id !== user.id);
            setUserList(updateUserList)
        }
    }

    const saveProject = () => {
        console.log(tasks);
        console.log(userList);
        const {name, description} = projectDetails;

        createProject(name, description, startDate, endDate).then((res) => {
            const project = res.data;
            Promise.all(userList.map((user) => addUserToProject(project.id, user.id, user.role))).then(() => {
                Promise.all(tasks.map((task) => {
                    createIssue(task.name, task.description, project.id, task.dueDate, task.priority, task.assigneeId ?? null, task.status);
                })).then(() => {
                    if (typeof onClose === 'function') {
                        onClose();
                    }
                });
            });
        });
    }
    useEffect(() => {
        if (projectInfo) {
            getIssueByProject(projectInfo.id).then((response) => {
                setTasks(response.data)
            })
            getProjectUsers(projectInfo.id).then((response) => {
                setUserList(response.data)
            })
        }
        console.log(projectInfo)
    }, [projectInfo]);
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
                            <DatePicker selected={startDate} className="input" placeholderText="Start"
                                        onChange={(date) => setStartDate(date)}/>
                        </div>
                        <div>
                            <label>End</label>
                            <DatePicker selected={endDate} className="input" placeholderText="End"
                                        onChange={(date) => setEndDate(date)}/>
                        </div>
                    </div>
                </div>
                <div>
                    <label>Description</label>
                    <Textarea className=' project-info' rows="5" placeholder="Description"
                              value={projectDetails.description}
                              onChange={(e) => handleInputChange("description", e.target.value)}></Textarea>
                </div>
                <div className='project-details-block__main'>
                    <div>
                        <h3>Users</h3>
                        <div className='project-details__tasks'>
                            {
                                userList.map((user, index) => (
                                    <UserCard key={index} name={`${user.firstName} ${user.lastName}`}
                                              role={user.role.id ?? user.role} user={user} deleteUser={deleteUser} openModal={() => openModalUser(user)} />
                                ))
                            }
                        </div>
                        <div className='button-block'>
                            <Button text='Add' onClick={() => openModalUser(null)}/>
                        </div>
                    </div>
                    <div className='main-tasks'>
                        <h3>Tasks</h3>
                        <div className="project-details__tasks">
                            {tasks.map((item, index) => (
                                <div onClick={() => openModalTask(item)}>
                                    <TaskInfo key={index} title={item.name}
                                              commentsCount="0" status={item.status} createdTime={item.creationDate}/>
                                </div>))
                            }
                        </div>
                        <div className='button-block'>
                            <Button text='Add' onClick={() => openModalTask(null)}/>
                        </div>
                    </div>
                </div>
                <div className="project-save">
                    <Button text={"Save"} onClick={saveProject}/>
                </div>
            </div>
            <Modal isOpen={isModalOpen} onClose={closeModalUser}>
                <AddUser tasks={tasks} addUser={addUserList} setTasks={setTasks} closeModal={closeModalUser} editUser={selectUser} projectId={projectInfo ? projectInfo.id : 0}/>
            </Modal>
            <Modal isOpen={isModalTaskOpen} onClose={closeModalTask}>
                <TaskCreation addTask={addTask} closeModal={closeModalTask} userList={userList} issue={selectTask} newProject={!selectTask}/>
            </Modal>

        </>
    );
};