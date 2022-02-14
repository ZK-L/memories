import { UPDATE, FETCH_ALL, CREATE, LIKE, DELETE, GETPOST } from '../constants/actionTypes';

export default function posts(posts = [], action) {
    switch (action.type) {
        case UPDATE:
            return posts.map((post) => post._id === action.payload._id ? action.payload : post);
        case FETCH_ALL:
            return action.payload;
        case CREATE:
            return [...posts, action.payload];
        case LIKE:
            return posts.map((post) => post._id === action.payload._id ? action.payload : post);
        case DELETE:
            return posts.filter((post) => post._id !== action.payload);
        case GETPOST:
            return posts.filter((post) => post._id === action.payload);
        default:
            return posts;
    }
}

