import './AddUser.css';
import {Form} from "react-bootstrap";
import Input from "../Controls/Input/Input";
import TaskInfo from "../TaskInfo/TaskInfo";
import {useContext, useState} from "react";
import Button from "../Button/Button";
import {FiSearch} from "react-icons/fi";
import {UserContext} from '../../App';
import rolesMap from "../../Hooks/Role";
import {addUserToProject} from "../../Hooks/Project";
import {updateIssue} from "../../Hooks/Issue";


export const AddUser = ({tasksList, addUser, setTasksList, closeModal, editUser = null, projectId = 0}) => {
    const {getUserByEmail} = useContext(UserContext);
    const [User, setUser] = useState(editUser ?? null);
    const [issueEditList, setIssueEditList] = useState([])
    const [Role, setRole] = useState(() => {
        return editUser ? editUser.role.id : 1;
    });
    const [tasks, setTasks] = useState(JSON.parse(JSON.stringify(tasksList)))

    const handlerTaskSelection = (task) => {
        if (task.id) {
            task.assignee = task.assignee ? null : User.id;
            const taskIndex = issueEditList.findIndex(exTask => exTask.id === task.id)

            if (taskIndex !== -1) {
                const updateList = issueEditList.map((issue, index) => (index === taskIndex ? task : issue));
                setIssueEditList(updateList);
            } else {
                setIssueEditList([...issueEditList, task])
            }

        } else {
            task.assigneeId = task.assigneeId ? null : User.id;
        }
    }
    const saveUser = (e) => {
        console.log("save")
        e.preventDefault();

        if (!editUser) {
            //edit == null
            if (projectId !== 0) {
                addUserToProject(projectId, User.id, User.role)
            }
            addUser(User);
        } else {
            if (editUser.role.id && Role !== editUser.role.id) {
                console.log(Role)
                addUserToProject(projectId, editUser.id, Role)
                editUser.role.id = Role;
                editUser.role.name = rolesMap?.Role;
                addUser(editUser)
            }
            if (!editUser.role.id && Role !== editUser.role) {
                addUserToProject(projectId, editUser.id, Role)
                editUser.role = Role;
                addUser(editUser)
            }
        }
        if (issueEditList.length !== 0) {
            Promise.all(issueEditList.map((task) => {
                updateIssue(task.id, task.name, task.description, task.project.id, task.creationDate, task.dueDate, task.priority, task.assignee, task.status).then(() => {
                    closeModal();
                }).catch((e) => {
                    console.error(e)})
            }))
        }

        setTasksList(tasks);

        closeModal();
    }
    const onChangeSelectRole = (e) => {
        const role = e.target.value;
        setUser({...User, role});
        setRole(role)
    }

    const handleUserEmailInput = (e) => {
        const email = e.target.value;
        if (email)
            getUserByEmail(email).then((res) => setUser({...res.data, role: 1}));
        else
            setUser(null);
    };

    return (
        <>
            <div>
                <Form className="add_user_form" onSubmit={saveUser}>
                    <h3 className="form_title">Add new user</h3>
                    <Form.Group>
                        <Form.Label>User email</Form.Label>
                        <div className="add_user_form-input-group">
                            <Input placeholder="User email" className="add_user_input" value={() => {
                                return editUser ? editUser.email : ''
                            }}
                                   onBlur={handleUserEmailInput} disabled={!!(editUser)}/>
                            <FiSearch className="icon-search"/>
                        </div>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Role</Form.Label>
                        <Form.Select className="select__role" aria-label="Role" onChange={onChangeSelectRole}
                                     value={Role}>
                            {Object.entries(rolesMap).map(([id, name]) => (
                                <option value={id} {...(Role === id ? 'selected' : '')}>{name}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mt-3">
                        <label>Assign tasks</label>
                        <div className="tasks-box">
                            {tasks.filter((task) => (!task.assignee || task.assignee?.id === User?.id || task.assignee === User?.id) && (!task.assigneeId || task?.assigneeId === User?.id)).map((task, index) => (
                                <div className="box_item" key={index}>
                                    <Form.Check type="checkbox" className="item_checkbox"
                                                checked={User && (task.assignee?.id === User?.id || task.assignee === User?.id || task?.assigneeId === User?.id)}
                                                onChange={(e) => handlerTaskSelection(task)}
                                        // checked={indexList.includes(index)}
                                    ></Form.Check>
                                    <TaskInfo
                                        title={task.name}
                                        commentsCount={index}
                                        endDate={task.dueDate}/>
                                </div>
                            ))}
                        </div>
                    </Form.Group>
                    <Form.Group className="add_user_form__btn">
                        <Button text="Save" type="submit"/>
                    </Form.Group>
                </Form>
            </div>
        </>
    )
}