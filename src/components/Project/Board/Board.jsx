import React, {useContext, useEffect, useState} from 'react';
import './Board.css';

import Buttton from '../../Button/Button';
import Input from '../../Controls/Input/Input';
import TaskInfo from '../../TaskInfo/TaskInfo';
import Modal from '../../Modal/Modal';
import TaskCreation from "../../TaskCreation/TaskCreation";
import {AddUser} from "../../AddUser/AddUser";
import {getIssueByAssignee} from "../../../Hooks/Issue";
import {UserContext} from "../../../App";

export default function Board() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tasks, setTasks] = useState([]);
    const {User} = useContext(UserContext)


    const openModal = () => {
        setIsModalOpen(true);
    };
    
    const closeModal = () => {
        setIsModalOpen(false);
    };
    useEffect( () => {
        if (User) {
            getIssueByAssignee(User.id).then((response) => {
                setTasks(response.data)
            })
        }
    }, User)

    const outputTasks = (status = '') => {
        const availabelTasks = tasks.sort((a, b) => {
            if (a.priority > b.priority)
                return 1;
            else if (a.priority < b.priority)
                return -1
            return 0;
        }).filter((a) => a.status == status);

        return availabelTasks.map((item) => (
            <TaskInfo
                title={item.name}
                status={item.status}
                commentsCount={3}
                createdTime={item.creationDate}
            />
        ))
    }
    return (
        <>
            <div className="board">
                <div className="board__header">
                    <label name="project-name">Project name</label>
                    <div className="board__controls">
                        <div>
                            <Input className="className" name="search" placeholder="Search..." />
                            <Input name="pearson-filter" placeholder="Person" />
                        </div>
                        <Buttton text="New task" onClick={openModal} />
                    </div>
                </div>
                <div className="board__body">
                    <div className="project-stage">
                        <label className="project-stage__caption">New</label>
                        <div className="project-stage__tasks">
                            {outputTasks("OPENED")}
                        </div>
                    </div>
                    <div className="project-stage">
                        <label className="project-stage__caption">To do</label>
                        <div className="project-stage__tasks">
                            {outputTasks("TO_DO")}
                        </div>
                    </div>
                    <div className="project-stage">
                        <label className="project-stage__caption">In process</label>
                        <div className="project-stage__tasks">
                            {outputTasks("IN_PROGRESS")}
                        </div>
                    </div>

                    <div className="project-stage">
                        <label className="project-stage__caption">In testing</label>
                        <div className="project-stage__tasks">
                            {outputTasks("IN_TESTING")}
                        </div>
                    </div>
                    <div className="project-stage">
                        <label className="project-stage__caption">Closed</label>
                        <div className="project-stage__tasks">
                            {outputTasks("DONE")}
                        </div>
                    </div>
                    <div className="project-stage">
                        <label className="project-stage__caption">Blocked</label>
                        <div className="project-stage__tasks">
                            {outputTasks("BLOCKED")}
                        </div>
                    </div>
                </div>
            </div>

            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <TaskCreation newProject={ false } />
            </Modal>
        </>
    );
};