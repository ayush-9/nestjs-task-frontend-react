export const signupReducer = (
  state = {
    username: "",
    loading: false,
  },
  action
) => {
  const { type, payload } = action;

  switch (type) {
    case "SIGNUP_SUCCESS":
      return {
        ...state,
        username: payload.username,
        loading: false,
      };

    case "SIGNUP_ERROR":
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case "SIGNUP_REQUEST":
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};
