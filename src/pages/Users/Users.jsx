import './Users.css'
import {Container} from "react-bootstrap";
import Header from "../../components/Header/Header";
import UserListItem from "../../components/UserListItem/UserListItem";
import Input from "../../components/Controls/Input/Input";
import {useContext, useEffect, useState} from "react";
import {UserContext} from "../../App";

export default function Users() {

    const [person, setPerson] = useState("");
    const [usersList, setUsersList] = useState([]);
    const {getUsersByFullName} = useContext(UserContext);

    useEffect(() => {
        if (person !== '' && person.length >= 2) {
            getUsersByFullName(person).then((persons) => {
                setUsersList(persons.data);
            })
        }else {
            setUsersList([])
        }
    }, [person])
    return (
        <>
            <Header/>
            <main>
                <Container className="d-flex justify-content-center">
                    <div className="users__body">
                        <label>Search</label>
                        <div>
                            <Input placeholder="Person..."
                                   onChange={(e) => {setPerson(e.target.value);}}
                                   className="person_input"
                            />
                        </div>
                        <div className="users-list">
                            {usersList.map((user) => (
                                <UserListItem user={user}/>
                            ))}
                        </div>
                    </div>
                </Container>
            </main>
        </>
    )
}