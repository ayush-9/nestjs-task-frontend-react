export const signinReducer = (
  state = {
    accessToken: "",
    loading: false,
  },
  action
) => {
  const { type, payload } = action;

  switch (type) {
    case "SIGNIN_SUCCESS":
      return {
        ...state,
        accessToken: payload.accessToken,

        loading: false,
      };

    case "SIGNIN_ERROR":
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case "SIGNIN_REQUEST":
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};
