import React, { useState } from 'react';
import './Board.css';

import Buttton from '../../Button/Button';
import Input from '../../Controls/Input/Input';
import TaskInfo from '../../TaskInfo/TaskInfo';
import Modal from '../../Modal/Modal';
import TaskCreation from "../../TaskCreation/TaskCreation";

export default function Board() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };
    
    const closeModal = () => {
        setIsModalOpen(false);
    };
    
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
                            <TaskInfo
                                title="Create new task"
                                status="New"
                                commentsCount={3}
                                createdTime="10 hours"
                                showStatus="true"
                            />
                            <TaskInfo
                                title="Create new task"
                                status="New"
                                commentsCount={3}
                                createdTime="10 hours"
                                showStatus="true"
                            />
                            <TaskInfo
                                title="Create new task"
                                status="New"
                                commentsCount={3}
                                createdTime="10 hours"
                                showStatus="true"
                            />
                            <TaskInfo
                                title="Create new task"
                                status="New"
                                commentsCount={3}
                                createdTime="10 hours"
                                showStatus="true"
                            />
                            <TaskInfo
                                title="Create new task"
                                status="New"
                                commentsCount={3}
                                createdTime="10 hours"
                                showStatus="true"
                            />
                            <TaskInfo
                                title="Create new task"
                                status="New"
                                commentsCount={3}
                                createdTime="10 hours"
                                showStatus="true"
                            />
                            <TaskInfo
                                title="Create new task"
                                status="New"
                                commentsCount={3}
                                createdTime="10 hours"
                                showStatus="true"
                            />
                             <TaskInfo
                                title="Create new task"
                                status="New"
                                commentsCount={3}
                                createdTime="10 hours"
                                showStatus="true"
                            />
                             <TaskInfo
                                title="Create new task"
                                status="New"
                                commentsCount={3}
                                createdTime="10 hours"
                                showStatus="true"
                            />
                        </div>
                    </div>

                    <div className="project-stage">
                        <label className="project-stage__caption">In process</label>
                        <div className="project-stage__tasks"></div>
                    </div>

                    <div className="project-stage">
                        <label className="project-stage__caption">Closed</label>
                        <div className="project-stage__tasks"></div>
                    </div>
                </div>
            </div>

            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <TaskCreation />
            </Modal>
        </>
    );
};