import './ProjectDetails.css';
import Button from "../Button/Button";
import TaskInfo from "../TaskInfo/TaskInfo";
import UserCard from "../UserCard/UserCard";
import Input from "../Controls/Input/Input";
import Textarea from "../Controls/Input/Textarea";
import Modal from "../Modal/Modal";
import {useEffect, useState} from "react";
import { AddUser } from "../AddUser/AddUser";

import { createAttachment } from '../../Hooks/Attachment';

import {
    createProject,
    addUserToProject,
    getProjectUsers,
    deleteUserProject,
    deleteProjectById, getProjectById, updateProject,
} from "../../Hooks/Project";
import {createIssue, deleteIssue, getIssueByProject, updateIssue} from "../../Hooks/Issue";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// CSS Modules, react-datepicker-cssmodules.css// 
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import TaskCreation from "../TaskCreation/TaskCreation";
import {FaTrash} from "react-icons/fa6";

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
    const [canModify, setCanModify] = useState(!projectInfo);

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
        setIsModalUserOpen(true);
    };

    const openModalTask = (task) => {
        setSelectTask(task);
        setIsModalTaskOpen(true);
    };
    const closeModalUser = () => {
        setSelectUser(null);
        setIsModalUserOpen(false);
        if (projectInfo) {
            loadIssue();
        }
    };
    const closeModalTask = () => {
        setIsModalTaskOpen(false);
        if (projectInfo) {
            loadIssue();
        }
        setSelectTask(null);

    };

    const addTask = (newTask, newFiles) => {
        if (projectInfo) {
            if (newTask.id) {
                //update
                updateIssue(newTask.id, newTask.name, newTask.description, projectInfo.id, newTask.creationDate, newTask.dueDate, newTask.priority, newTask.assigneeId ?? null, newTask.status).then(() => {
                    closeModalTask();
                })
                newFiles.map(file => {
                    createAttachment(newTask.id, file.name, file)
                })
            } else {
                //create
                createIssue(newTask.name, newTask.description, projectInfo.id, newTask.dueDate, newTask.priority, newTask.assigneeId ?? null, newTask.status).then((resp) => {
                    closeModalTask();
                    newFiles.map(file => {
                        createAttachment(resp.data.id, file.name, file)
                    })
                })
            }
        } else {
            newTask.attachments = newFiles;
            setTasks([...tasks, newTask])
        }
    }

    const addUserList = (newUser) => {
        //check copy
        const userIndex = userList.findIndex(exUser => exUser.id === newUser.id);

        if (userIndex !== -1) {
            const updateUserList = userList.map((user, index) => (index === userIndex ? newUser : user));
            setUserList(updateUserList);
        } else {
            setUserList([...userList, newUser]);
        }
    }
    const deleteUser = (user) => {
        if (user.role.id) {
            deleteUserProject(projectInfo.id, user.id).then(() => {
                const updateUserList = userList.filter(userOfList => userOfList.id !== user.id);
                setUserList(updateUserList)
            }).catch((e) => {
                console.error(e)
            })
        }
    }

    const deleteProject = () => {
        if (projectInfo && canModify) {
            deleteProjectById(projectInfo.id).then(() => {
                onClose();
            })
        }
    }

    const saveProject = () => {
        const {name, description} = projectDetails;
        if (projectInfo) {
            updateProject(projectInfo.id, name, description, projectInfo.creationDate, startDate, endDate).then(() => {
                if (typeof onClose === 'function') {
                    onClose();
                }
            })
        } else {
            createProject(name, description, startDate, endDate).then((res) => {
                const project = res.data;
                Promise.all(userList.map((user) => addUserToProject(project.id, user.id, user.role))).then(() => {
                    Promise.all(tasks.map((task) => {
                        createIssue(task.name, task.description, project.id, task.dueDate, task.priority, task.assigneeId ?? null, task.status).then((resp) => {
                            task.attachments.map(file => {
                                createAttachment(resp.data.id, file.name, file)
                            })
                        });
                    })).then(() => {
                        if (typeof onClose === 'function') {
                            onClose();
                        }
                    });
                });
            });
        }
    }
    const loadIssue = () => {
        if (projectInfo) {
            getIssueByProject(projectInfo.id).then((response) => {
                setTasks(response.data)
            })
        }
    }
    useEffect(() => {
        if (projectInfo) {
            getIssueByProject(projectInfo.id).then((response) => {
                setTasks(response.data)
            })
            getProjectUsers(projectInfo.id).then((response) => {
                setUserList(response.data)
            })
            getProjectById(projectInfo.id).then((response) => {
                const data = response.data
                setCanModify(data.canModify)
                console.log(canModify)
            })
        }
    }, [projectInfo]);
    const parseDate = (date) => {
        date = new Date(date);
        return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
    }
    return (
        <>
            <div className='project-details-block'>
                <div className="project-header">
                    <div>
                        <label>Project Name</label>
                        {canModify && <Input className=' project-name' placeholder="Project Name"
                               value={projectDetails.name}
                               onChange={(e) => handleInputChange("name", e.target.value)}
                        ></Input>}
                        {!canModify && <span className="project-text">{projectDetails.name}</span>}
                    </div>
                    <div className="project-dates">
                        <div>
                            <label>Start</label>
                            {canModify && <DatePicker selected={startDate} className="input" placeholderText="Start"
                                        onChange={(date) => setStartDate(date)}/>}
                            {!canModify && <span className="project-text">{parseDate(startDate)}</span>}
                        </div>
                        <div>
                            <label>End</label>
                            {canModify && <DatePicker selected={endDate} className="input" placeholderText="End"
                                        onChange={(date) => setEndDate(date)}/>}
                            {!canModify && <span className="project-text">{parseDate(endDate)}</span>}
                        </div>
                    </div>
                </div>
                <div>
                    <label>Description</label>
                    {canModify && <Textarea className=' project-info' rows="5" placeholder="Description"
                              value={projectDetails.description}
                              onChange={(e) => handleInputChange("description", e.target.value)}></Textarea>}
                    {!canModify && <p className="project-text">{projectDetails.description}</p>}
                </div>
                <div className='project-details-block__main'>
                    <div>
                        <h3>Users</h3>
                        <div className='project-details__tasks'>
                            {
                                userList.map((user, index) => (
                                    <UserCard key={index} name={`${user.firstName} ${user.lastName}`}
                                              role={user.role.id ?? user.role} user={user} deleteUser={deleteUser}
                                              openModal={() => openModalUser(user)} canModify={canModify}/>
                                ))
                            }
                        </div>
                        <div className='button-block'>
                            {canModify && <Button text='Add' onClick={() => openModalUser(null)}/>}
                        </div>
                    </div>
                    <div className='main-tasks'>
                        <h3>Tasks</h3>
                        <div className="project-details__tasks">
                            {tasks.map((item, index) => (
                                <div onClick={() => openModalTask(item)}>
                                    <TaskInfo key={index} title={item.name}
                                              id={item.id} status={item.status} endDate={item.dueDate}/>
                                </div>))
                            }
                        </div>
                        <div className='button-block'>
                            {canModify && <Button text='Add' onClick={() => openModalTask(null)}/>}
                        </div>
                    </div>
                </div>
                <div className="project-save">
                    {canModify && <Button text={"Save"} onClick={saveProject}/>}
                    {projectInfo && canModify && <FaTrash className="project_trash" onClick={deleteProject}/>}
                </div>
            </div>
            <Modal isOpen={isModalOpen} onClose={closeModalUser}>
                <AddUser tasksList={tasks} addUser={addUserList} setTasksList={setTasks} closeModal={closeModalUser}
                         editUser={selectUser} projectId={projectInfo ? projectInfo.id : 0}/>
            </Modal>
            <Modal isOpen={isModalTaskOpen} onClose={closeModalTask}>
                <TaskCreation callback={addTask} closeModal={closeModalTask} userList={userList} issue={selectTask}
                              newProject={!selectTask} updateTaskList={loadIssue} modify={canModify}/>
            </Modal>

        </>
    );
};