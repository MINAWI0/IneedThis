import {
  FIND_REQUEST_BY_ID_FAILURE,
  FIND_REQUEST_BY_ID_REQUEST,
  FIND_REQUEST_BY_ID_SUCCESS,
  GET_ALL_REQUESTS_SUCCESS,
  GET_USERS_REQUEST_SUCCESS,
  LIKE_REQUEST_FAILURE,
  LIKE_REQUEST_REQUEST,
  LIKE_REQUEST_SUCCESS,
  OFFRE_SUCCESS,
  REQUEST_COPY_FAILURE,
  REQUEST_COPY_REQUEST,
  REQUEST_COPY_SUCCESS,
  REQUEST_CREATE_FAILURE,
  REQUEST_CREATE_REQUEST,
  REQUEST_CREATE_SUCCESS,
  REQUEST_DELETE_FAILURE,
  REQUEST_DELETE_REQUEST,
  REQUEST_DELETE_SUCCESS,
  USER_LIKE_REQUEST_FAILURE,
  USER_LIKE_REQUEST_REQUEST,
  USER_LIKE_REQUEST_SUCCESS,
} from "./ActionType";

const intialState = {
  loading: false,
  data: null,
  error: null,
  requests: [],
  request: null,
};

export const requestReducer = (state = intialState, action) => {
  switch (action.type) {
    case REQUEST_CREATE_REQUEST:
    case REQUEST_DELETE_REQUEST:
    case USER_LIKE_REQUEST_REQUEST:
    case LIKE_REQUEST_REQUEST:
    case REQUEST_COPY_REQUEST:
    case FIND_REQUEST_BY_ID_REQUEST:
      return { ...state, loading: true, error: null };
    case REQUEST_CREATE_FAILURE:
    case REQUEST_DELETE_FAILURE:
    case USER_LIKE_REQUEST_FAILURE:
    case LIKE_REQUEST_FAILURE:
    case REQUEST_COPY_FAILURE:
    case FIND_REQUEST_BY_ID_FAILURE:
      return { ...state, loading: false, error: action.payload.error };
    case REQUEST_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        data: action.payload, // added by me for testing , back here if tou have refresh problem or data problem 
        requests: [action.payload, ...state.requests],
      };
    case GET_ALL_REQUESTS_SUCCESS:
    case GET_USERS_REQUEST_SUCCESS:
        return {
            ...state,
            loading: false,
            error: null,
            requests: action.payload,
          };
    case USER_LIKE_REQUEST_SUCCESS:
                    return {
                        ...state,
                        loading: false,
                        error: action.payload,
                        likedRequests: action.payload,
                    };
    case LIKE_REQUEST_SUCCESS:
                    return {
                            ...state,
                            loading: false,
                            error: null, // null is by me : it was : action.payload befor
                            like: action.payload,
                        };   
    case REQUEST_DELETE_SUCCESS:
                            return {
                                    ...state,
                                    loading: false,
                                    error: action.payload,
                                    requests: state.requests.filter((request) => request.id!==action.payload),
                                };   
    case REQUEST_COPY_SUCCESS:
                            return {
                                    ...state,
                                    loading: false,
                                    error: action.payload,
                                    copyRequest: action.payload
                                };   
    case FIND_REQUEST_BY_ID_SUCCESS:
    case OFFRE_SUCCESS:
                            return {
                                    ...state,
                                    loading: false,
                                    error: action.payload,
                                    request: action.payload
                                };   

    default:
      return state;
  }
};
