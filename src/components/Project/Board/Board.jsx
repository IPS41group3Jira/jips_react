import './Board.css';

import Buttton from '../../Button/Button';
import Input from '../../Controls/Input/Input';
import TaskInfo from '../../TaskInfo/TaskInfo';

export default function Board() {
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
                        <Buttton text="New task" />
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
                            />
                            <TaskInfo
                                title="Create new task"
                                status="New"
                                commentsCount={3}
                                createdTime="10 hours"
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
        </>
    );
};