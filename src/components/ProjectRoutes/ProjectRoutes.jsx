import './ProjectRoutes.css';
import {LuClipboardList} from "react-icons/lu";
import {FiCalendar, FiGrid, FiList} from "react-icons/fi";
import { useState } from "react";
import Modal from '.././Modal/Modal';
import ProjectDetails from '../ProjectDetails/ProjectDetails';
export default function ProjectRoutes(){
    const [activeItems, setActiveItems] = useState('Work items');
    const handleItemClick = (item) => {
        setActiveItems(item);

        openModal()
    }

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };
    
    const closeModal = () => {
        setIsModalOpen(false);
    };
    
    return(
        <>
            <div className="navigation-menu">
                <div className={`menu-item ${activeItems === 'Work items' ? 'active' : '' }`}
                     onClick={() => handleItemClick('Work items')}
                >
                    <LuClipboardList />
                    <span className="item-text">Work items</span>
                </div>
                <div className={`menu-item ${activeItems === 'Sprints' ? 'active' : '' }`}
                     onClick={() => handleItemClick('Sprints')}
                >
                    <FiList />
                    <span className="item-text">Sprints</span>
                </div>
                <div className={`menu-item ${activeItems === 'Board' ? 'active' : '' }`}
                     onClick={() => handleItemClick('Board')}
                >
                    <FiGrid />
                    <span className="item-text">Board</span>
                </div>
                <div className={`menu-item ${activeItems === 'Calendar' ? 'active' : '' }`}
                     onClick={() => handleItemClick('Calendar')}
                >
                    <FiCalendar />
                    <span className="item-text">Calendar</span>
                </div>
            </div>
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <ProjectDetails />
            </Modal>
        </>
    )
}