import './UserCard.css';
import {VscAccount} from "react-icons/vsc";
import { IoIosCloseCircle } from "react-icons/io";
import rolesMap from "../../Hooks/Role"

export default function UserCard({name, role, deleteUser, user, openModal, canModify = false}) {
    return (
        <div className='user-card'>
            <div className='user-card__info'>
                <VscAccount className="icon_account"/>
                <span className='user-card__name'>{name}</span>
                <span>({rolesMap?.[role]})</span>
            </div>
            {canModify && <div className='editing-user'>
                <a className='editing-user__link' onClick={openModal}>Edit</a>
                <IoIosCloseCircle className='button-close' onClick={() => deleteUser(user)}/>
            </div>}
        </div>
    );
};