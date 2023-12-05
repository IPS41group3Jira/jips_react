// Import necessary dependencies and utility functions
import Axios from '../Axios';
import { jwtDecode } from "jwt-decode";
import dateFormat from './DateFormat';

/**
 * Creates a new project.
 * @param {string} name - The name of the project.
 * @param {string} description - The description of the project.
 * @param {Date|null} startDate - The start date of the project (can be null).
 * @param {Date|null} endDate - The end date of the project (can be null).
 * @returns {Promise} - A promise that resolves with the result of the POST request.
 */
const createProject = (name = '', description = '', startDate = null, endDate = null) => {
    // Get the current date as the creation date
    const creationDate = new Date();

    // Send a POST request to create the project
    return Axios.post('/project', {
        name,
        description,
        creationDate: dateFormat(creationDate),
        startDate: dateFormat(startDate),
        endDate: dateFormat(endDate)
    });
}

/**
 * Updates an existing project.
 * @param {string} projectId - The ID of the project to be updated.
 * @param {string} name - The new name of the project.
 * @param {string} description - The new description of the project.
 * @param {Date|null} creationDate - The new creation date of the project (can be null).
 * @param {Date|null} startDate - The new start date of the project (can be null).
 * @param {Date|null} endDate - The new end date of the project (can be null).
 * @returns {Promise} - A promise that resolves with the result of the PUT request.
 */
const updateProject = (projectId = '', name = '', description = '', creationDate = '', startDate = '', endDate = '') => {
    // Send a PUT request to update the project
    return Axios.put(`/project/${projectId}`, {
        name,
        description,
        creationDate: dateFormat(creationDate),
        startDate: dateFormat(startDate),
        endDate: dateFormat(endDate)
    });
}

/**
 * Adds a user to a project.
 * @param {string} projectId - The ID of the project to which the user will be added.
 * @param {string} userId - The ID of the user to be added.
 * @param {string} roleId - The ID of the role assigned to the user in the project.
 * @returns {Promise} - A promise that resolves with the result of the POST request.
 */
const addUserToProject = (projectId = '', userId = '', roleId = '') => {
    // Send a POST request to add the user to the project
    return Axios.post(`/project/${projectId}/user`, { userId, roleId });
}

/**
 * Gets users associated with a project.
 * @param {string} projectId - The ID of the project for which users are retrieved.
 * @returns {Promise} - A promise that resolves with the result of the GET request.
 */
const getProjectUsers = (projectId = '') => {
    // Send a GET request to fetch the project's users
    return Axios.get(`/project/${projectId}/users`);
}

/**
 * Removes a user from a project.
 * @param {string} projectId - The ID of the project from which the user will be removed.
 * @param {string} userId - The ID of the user to be removed.
 * @returns {Promise} - A promise that resolves with the result of the DELETE request.
 */
const deleteUserProject = (projectId = '', userId = '') => {
    // Send a DELETE request to remove the user from the project
    return Axios.delete(`project/${projectId}/user/${userId}`);
}

/**
 * Deletes a project by its ID.
 * @param {string} projectId - The ID of the project to be deleted.
 * @returns {Promise} - A promise that resolves with the result of the DELETE request.
 */
const deleteProjectById = (projectId = '') => {
    // Send a DELETE request to delete the project
    return Axios.delete(`project/${projectId}`);
}

/**
 * Gets a project by its ID.
 * @param {string} projectId - The ID of the project to be retrieved.
 * @returns {Promise} - A promise that resolves with the result of the GET request.
 */
const getProjectById = (projectId = '') => {
    // Send a GET request to fetch the project by ID
    return Axios.get(`project/${projectId}`);
}

/**
 * Gets projects by name (search).
 * @param {string} projectName - The name of the projects to be retrieved.
 * @returns {Promise} - A promise that resolves with the result of the GET request.
 */
const getProjectsByName = (projectName = '') => {
    // Send a GET request to fetch projects by name (search)
    return Axios.get(`project/?like=${projectName}`);
}

// Export all functions for use in other files
export {
    createProject,
    addUserToProject,
    getProjectUsers,
    deleteUserProject,
    getProjectsByName,
    deleteProjectById,
    getProjectById,
    updateProject
};
