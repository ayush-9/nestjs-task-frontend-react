import axios from "axios";

export const signup = (username, password) => async (dispatch, getState) => {
  try {
    dispatch({
      type: "SIGNUP_REQUEST",
    });
    const data = await axios.post("http://localhost:3001/users/signup", {
      username,
      password,
    });

    dispatch({
      type: "SIGNUP_SUCCESS",
      payload: {
        username: data.data.username,
      },
    });
  } catch (error) {
    dispatch({
      type: "SIGNUP_ERROR",
      payload: error.response.data,
    });
  }
};
