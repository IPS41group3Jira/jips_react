import Header from "../../components/Header/Header";
import ProjectRoutes from "../../components/ProjectRoutes/ProjectRoutes";
import TaskInfo from "../../components/TaskInfo/TaskInfo";

export default function Main() {
	return (
		<>
			<Header />
			<ProjectRoutes />
			<TaskInfo
				title="Create new task"
				status="New"
				commentsCount={3}
				createdTime="10 hours"
			/>
		</>
	)
}