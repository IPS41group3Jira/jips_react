import './UserCard.css';
import {VscAccount} from "react-icons/vsc";
import {IoIosCloseCircle} from "react-icons/io";
export default function UserCard({name, role}) {
    return (
        <div className='user-card'>
            <div className='user-card__info'>
                <VscAccount className="icon_account"/>
                <span className='user-card__name'>{name}</span>
                <span>({role})</span>
            </div>
            <div className='editing-user'>
                <a className='editing-user__link'>Block</a>
                <a className='editing-user__link'>Edit</a>
                <IoIosCloseCircle className='button-close'/>
            </div>
        </div>
    );
};