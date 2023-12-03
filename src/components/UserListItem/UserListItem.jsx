import "./UserListItem.css"
import {VscAccount} from "react-icons/vsc";
import {useContext, useEffect, useState} from "react";
import {FaAngleDown} from "react-icons/fa6";
import {FaAngleUp} from "react-icons/fa";
import {UserContext} from "../../App";

export default function UserListItem({user}) {
    const [projects, setProjects] = useState([])
    const [isProjectListVisible, setProjectListVisible] = useState(false);
    const projectToShow = isProjectListVisible ? projects.length : 2;
    const {User, getListProjectsByUserId} = useContext(UserContext);
    const toggleProjectList = () => {
        setProjectListVisible(!isProjectListVisible);
    }
    useEffect(() => {
        if (user.id) {
            getListProjectsByUserId(user.id).then((resp) => {
                setProjects(resp.data)
            })
        }
    }, [user])
    return (
        <>
            <div className="user-list-item">
                <div className="user-list-item_info">
                    <div>
                        <VscAccount className="icon-account"/>
                        <div className="user-detail">
                            <label>{user.firstName} {user.lastName}</label>
                            {
                                projects.slice(0, projectToShow).map((item) => (
                                    <p key={item.id}>{item.name}</p>
                                ))
                            }
                        </div>
                    </div>
                </div>
                <div className="hidden-control" onClick={toggleProjectList}>
                    {isProjectListVisible ? <FaAngleUp/> : <FaAngleDown/>}
                </div>
            </div>
        </>
    )
}