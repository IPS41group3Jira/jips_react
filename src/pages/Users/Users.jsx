import './Users.css'
import {Container} from "react-bootstrap";
import Header from "../../components/Header/Header";
import UserListItem from "../../components/UserListItem/UserListItem";

export default function Users() {
const projects = [
    {id: 1, project_name: "Project name1", user_role: "Role1"},
    {id: 2, project_name: "Project name2", user_role: "Role2"},
    {id: 3, project_name: "Project name3", user_role: "Role3"},
]
    return (
        <>
            <Header/>
            <main>
                <Container className="d-flex justify-content-center">
                    <div className="users-list">
                        <UserListItem projects={projects}/>
                        <UserListItem projects={projects}/>
                    </div>
                </Container>
            </main>
        </>
    )
}