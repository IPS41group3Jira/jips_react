import Header from "../../components/Header/Header";

import Board from '../../components/Project/Board/Board';
import './Main.css'

export default function Main() {
	return (
		<>
			<Header />
			<main>
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