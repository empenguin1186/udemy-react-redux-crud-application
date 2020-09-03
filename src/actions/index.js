import axios from 'axios';

export const READ_EVENTS = 'READ_EVENTS';
export const CREATE_EVENT = 'CREATE_EVENT';
export const DELETE_EVENT = 'DELETE_EVENT';
const ROOT_URL = 'https://udemy-utils.herokuapp.com/api/v1';
const QUERY_STRING = '?token=token123';

// define action creator
export const readEvents = () => async dispatch => {
    const response = await axios.get(`${ROOT_URL}/events${QUERY_STRING}`);
    console.log(response)
    dispatch({ type: READ_EVENTS, response })
}

// define action creator
export const postEvent = values => async dispatch => {
    const response = await axios.post(`${ROOT_URL}/events${QUERY_STRING}`, values);
    console.log(response)
    dispatch({ type: CREATE_EVENT, response })
}

// define action creator
export const deleteEvent = id => async dispatch => {
    const response = await axios.delete(`${ROOT_URL}/events/${id}${QUERY_STRING}`);
    console.log("delete action invoked");
    console.log(response);
    dispatch({ type: DELETE_EVENT, id })
}