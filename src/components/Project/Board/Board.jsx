import React, {useContext, useEffect, useState} from 'react';
import './Board.css';


import { getProjectsByName } from '../../../Hooks/Project'
import Buttton from '../../Button/Button';
import Input from '../../Controls/Input/Input';
import TaskInfo from '../../TaskInfo/TaskInfo';
import Modal from '../../Modal/Modal';
import TaskCreation from "../../TaskCreation/TaskCreation";
import { AddUser } from "../../AddUser/AddUser";
import {getProjectUsers} from "../../../Hooks/Project";
import {getIssueByAssignee, updateIssue} from "../../../Hooks/Issue";
import { UserContext } from "../../../App";

export default function Board() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userList, setUserList] = useState([]);
    const [selectTask, setSelectTask] = useState(null);
    const [tasksList, setTasksList] = useState([])
    const [tasks, setTasks] = useState([]);
    const { User, getUsersByFullName } = useContext(UserContext);

    const [projectsLookup, setProjectLookup] = useState([]);
    const [projectName, setProjectName] = useState('')
    const [personLookup, setPersonLookup] = useState([]);
    const [person, setPerson] = useState('')

    const loadTasks = () => {
        if (User) {
            getIssueByAssignee(User.id).then((response) => {
                setTasksList(response.data)
            })
        }
    }


    const openModal = (val) => {
        setSelectTask(val);
        getProjectUsers(val.projectId).then((res) => {
            setUserList(res.data);
            setIsModalOpen(true);
        });
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectTask(null)
    };

    const updateTask = (task) => {
        const { id = null, name = "", description = "", projectId = "", creationDate = null, dueDate = null, priority = "", assigneeId = "", status = "" } = task;
        updateIssue(id, name, description, projectId, creationDate, dueDate, priority, assigneeId, status).then(() => {
            loadTasks();
        });
    }

    useEffect(() => {
        loadTasks();
    }, [User])

    const outputTasks = (status = '') => {
        const availableTasks = tasks.sort((a, b) => {
            if (a.priority > b.priority)
                return 1;
            else if (a.priority < b.priority)
                return -1
            return 0;
        }).filter((a) => a.status == status);

        return availableTasks.map((item) => (
            <div onClick={() => openModal(item)}>
                <TaskInfo
                    title={item.name}
                    commentsCount={3}
                    createdTime={item.creationDate}
                />
            </div>
        ))
    }

    useEffect(() => {
        const projectsIds = projectsLookup.map((p) => p.id);
        const usersIds = personLookup.map((u) => u.id); 
        setTasks(tasksList.filter((task) => (projectsIds.includes(task.projectId)) && (usersIds.includes(task.assigneeId))));
    }, [projectsLookup, personLookup, tasksList])


    
    useEffect(() => {
        getProjectsByName(projectName).then((projects) => {
            setProjectLookup(projects.data);
        })
    }, [projectName])

    
    useEffect(() => {
        getUsersByFullName(person).then((persons) => {
            setPersonLookup(persons.data);
        })
    }, [person])

    return (
        <>
            <div className="board">
                <div className="board__header">
                    <label>Project name</label>
                    <div className="board__controls">
                        <div>
                            <Input name="project-name" placeholder="Project Name..." onChange={(e) => { setProjectName(e.target.value); } } />
                            <Input name="pearson-filter" placeholder="Person..." onChange={(e) => { setPerson(e.target.value);; } } />
                        </div>
                    </div>
                </div>
                <div className="board__body">
                    {
                        [
                            ['OPENED', 'New'],
                            ['TO_DO', 'To do'],
                            ['IN_PROGRESS', 'In process'],
                            ['IN_TESTING', 'In testing'],
                            ['DONE', 'Closed'],
                            ['BLOCKED', 'Blocked']
                        ].map(([value, label]) => (
                            <div className="project-stage">
                                <label className="project-stage__caption">{ label }</label>
                                <div className="project-stage__tasks">
                                    {outputTasks(value)}
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>

            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <TaskCreation callback={ updateTask } newProject={false} closeModal={closeModal} issue={selectTask} userList={userList}/>
            </Modal>
        </>
    );
};