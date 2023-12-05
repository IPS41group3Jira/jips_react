// Import necessary dependencies
import Axios from '../Axios';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"

/**
 * Custom hook for managing user authentication.
 * @returns {Object} - An object containing functions and state variables related to authentication.
 */
export default function useAuth() {
    // Use React Router's navigation hook
    const navigate = useNavigate();

    // State variables to store user and project information
    const [User, setUser] = useState(null);
    const [Projects, setProjects] = useState(null);

    /**
     * Method to sign in a user with provided email and password.
     * @param {string} email - The email of the user.
     * @param {string} password - The password of the user.
     * @returns {Promise} - A promise that resolves with the result of the sign-in request.
     */
    const signIn = (email, password) => {
        return Axios.post('/user/login', { email, password }).then(resp => {
            console.log(resp.data)
            // Store the access token in local storage
            localStorage.setItem('accessToken', resp.data);
            // Decode the token to get user ID and fetch user information
            const decode = jwtDecode(resp.data);
            getUser(decode.userId);
        }).catch(console.log);
    };

    /**
     * Method to fetch user information by ID or from the stored token.
     * @param {string} id - The ID of the user to fetch. If not provided, it fetches the user associated with the stored token.
     * @returns {Promise} - A promise that resolves with the user information.
     */
    const getUser = (id = '') => {
        if (!id) {
            const token = localStorage.getItem('accessToken');
            if (!token) {
                // Redirect to login page if no token is found
                navigate('/login');
                return;
            }

            // Decode the token to get user ID
            const decode = jwtDecode(token);
            id = decode?.userId;
        }

        // Fetch user information from the server
        return Axios.get(`/user/${id}`).then(user => {
            setUser(user.data);
        }).catch(() => {
            // Log out if an error occurs during user fetch
            logOut();
        });
    }

    /**
     * Method to fetch user by email.
     * @param {string} email - The email of the user to fetch.
     * @returns {Promise} - A promise that resolves with the user information.
     */
    const getUserByEmail = (email) => {
        return Axios.get(`/user/email/${email}`);
    }

    /**
     * Method to fetch a list of projects.
     * @returns {Promise} - A promise that resolves with the list of projects.
     */
    const getListProjects = () => {
        return Axios.get('/user/projects')
    }

    /**
     * Method to fetch a list of projects by user ID.
     * @param {string} userId - The ID of the user for whom to fetch projects.
     * @returns {Promise} - A promise that resolves with the list of projects.
     */
    const getListProjectsByUserId = (userId = '') => {
        return Axios.get(`/user/${userId}/projects`)
    }

    /**
     * Method to sign up a new user with provided details.
     * @param {string} email - The email of the new user.
     * @param {string} password - The password of the new user.
     * @param {string} firstName - The first name of the new user.
     * @param {string} lastName - The last name of the new user.
     * @returns {Promise} - A promise that resolves with the result of the sign-up request.
     */
    const signUp = (email, password, firstName, lastName) => {
        return Axios.post('/user/register', { email, password, firstName, lastName }).then(() => {
            // Automatically sign in the new user after registration
            signIn(email, password);
        }).catch(console.log);
    }

    /**
     * Method to log out the user.
     */
    const logOut = () => {
        // Clear local storage, log the action, and navigate to login page
        localStorage.clear()
        console.log("storage cleared");
        setUser(null);
        navigate('/login');
    }

    /**
     * Method to update user information.
     * @param {string} firstName - The updated first name of the user.
     * @param {string} lastName - The updated last name of the user.
     * @param {string} userId - The ID of the user to be updated.
     * @returns {Promise} - A promise that resolves with the result of the user update request.
     */
    const updateUser = (firstName, lastName, userId = '') => {
        return Axios.put(`user/${userId}`, { firstName, lastName })
    }

    /**
     * Method to fetch users by full name.
     * @param {string} fullName - The full name or part of the full name to search for.
     * @returns {Promise} - A promise that resolves with the list of users matching the search.
     */
    const getUsersByFullName = (fullName = '') => {
        return Axios.get(`user/?like=${fullName}`);
    }

    // Return the public interface of the hook
    return {
        signIn,
        signUp,
        User,
        getUser,
        getListProjects,
        logOut,
        getUserByEmail,
        updateUser,
        getUsersByFullName,
        getListProjectsByUserId
    };
}
