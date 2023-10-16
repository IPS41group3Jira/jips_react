import Header from "../../components/Header/Header";
import ProjectRoutes from "../../components/ProjectRoutes/ProjectRoutes";
import TaskInfo from "../../components/TaskInfo/TaskInfo";
import Login from "../Authorization/Login";
import Board from '../../components/Project/Board/Board';
import './Main.css'
import ProjectDetails from "../../components/ProjectDetails/ProjectDetails";

export default function Main() {
	return (
		<>
			<Header />
			<main>
				<ProjectRoutes />
				<Board />
				{/* <TaskInfo
					title="Create new task"
					status="New"
					commentsCount={3}
					createdTime="10 hours"
				/> */}
			</main>
			{/*<Login/>*/}
		</>
	)
}