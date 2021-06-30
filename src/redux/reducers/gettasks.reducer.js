export const gettasksReducer = (
  state = {
    tasks: [],
  },
  action
) => {
  switch (action.type) {
    case "FETCH_ALL":
      return {
        ...state,
        tasks: [...action.payload],
      };

    case "FETCH_ALL_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    case "UPDATEINDEX":
      return {
        ...state,
        tasks: [...action.payload],
      };

    case "UPDATEINDEX_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    case "UPDATECOMPINDEX":
      return {
        ...state,
        tasks: [...action.payload],
      };

    case "UPDATECOMPINDEX_ERROR":
      return {
        ...state,
        error: action.payload,
      };

    case "DELETETASK":
      return {
        ...state,
        tasks: state.tasks.filter((x) => x._id !== action.payload),
      };
    case "DELETETASK_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    case "CREATE":
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
    case "CREATE_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    case "FILTER":
      return {
        ...state,
        tasks: [...action.payload],
      };
    case "FILTER_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    case "SEARCH":
      return {
        ...state,
        tasks: [...action.payload],
      };
    case "SEARCH_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    case "SORT":
      return {
        ...state,
        tasks: [...action.payload],
      };
    case "SORT_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    case "UPDATE":
      return {
        ...state,
        tasks: state.tasks.map((x) =>
          x._id === action.payload._id ? action.payload : x
        ),
      };
    case "UPDATE_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    case "UPDATESTATUS":
      return {
        ...state,
        tasks: state.tasks.map((x) =>
          x._id === action.payload._id ? action.payload : x
        ),
      };
    case "UPDATESTATUS_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
