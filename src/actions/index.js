import axios from 'axios';

export const READ_EVENTS = 'READ_EVENTS';
export const CREATE_EVENT = 'CREATE_EVENT';
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