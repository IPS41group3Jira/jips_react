import './ProjectDetails.css';
import Button from "../Button/Button";
import TaskInfo from "../TaskInfo/TaskInfo";
import UserCard from "../UserCard/UserCard";
export default function ProjectDetails(){
    return(
        <div className='project-details-block'>
            <div className='project-text project-name'>Software Project</div>
            <div className='project-text project-info'>
                The Agile Project Management System (APMS) is a robust and versatile software
                designed to enhance project management processes across various industries.
                APMS is built to accommodate both traditional and agile methodologies,
                making it a versatile choice for teams of all sizes. Key Features: Intuitive User Interface:
                APMS offers a user-friendly interface, ensuring easy adoption and usability for team members
                at all levels. Task and Issue Tracking: It simplifies the creation, assignment, and tracking of tasks,
                issues, and user stories, providing comprehensive visibility into project progress. Agile Methodology
                Support: APMS accommodates Scrum, Kanban, and other agile methodologies, allowing teams to manage projects
                according to their unique workflow. Customizable Workflows: Tailor workflows to match your team's specific
                processes, ensuring flexibility and efficiency in project execution. Integration Capabilities: APMS
                seamlessly integrates with popular development tools, version control systems, and communication platforms,
                facilitating enhanced collaboration and data synchronization.
            </div>
            <div className='project-details-block__main'>
                <div>
                    <h3>Users</h3>
                    <div className='project-details__tasks'>
                        <UserCard name ='Emily Smith' role = 'role'/>
                        <UserCard name ='Emily Smith' role = 'role'/>
                        <UserCard name ='Emily Smith' role = 'role'/>
                        <UserCard name ='Emily Smith' role = 'role'/>
                        <UserCard name ='Emily Smith' role = 'role'/>
                        <div className='button-block'>
                            <Button text='Add'/>
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
        </div>
    );
};