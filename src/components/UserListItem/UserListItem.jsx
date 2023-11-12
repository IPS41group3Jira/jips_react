import "./UserListItem.css"
import {VscAccount} from "react-icons/vsc";
import {useState} from "react";
import {FaAngleDown} from "react-icons/fa6";
import {FaAngleUp} from "react-icons/fa";

export default function UserListItem({projects}) {
    const [isProjectListVisible, setProjectListVisible] = useState(false);
    const projectToShow = isProjectListVisible ? projects.length : 2;
    const toggleProjectList = () => {
        setProjectListVisible(!isProjectListVisible);
    }
    return (
        <>
            <div className="user-list-item">
                <div className="user-list-item_info">
                    <div>
                        <VscAccount className="icon-account"/>
                        <div className="user-detail">
                            <label> Emily Smith</label>
                            {
                                projects.slice(0, projectToShow).map((item) => (
                                    <p key={item.id}>{item.project_name} ({item.user_role})</p>
                                ))
                            }
                        </div>
                    </div>
                    <div className="user-manager">
                        <span>Block</span>
                        <span>Edit</span>
                    </div>
                </div>
                <div className="hidden-control" onClick={toggleProjectList}>
                    {isProjectListVisible ? <FaAngleUp/> : <FaAngleDown/>}
                </div>
            </div>
        </>
    )
}