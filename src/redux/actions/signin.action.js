import axios from "axios";

export const signin = (username, password) => async (dispatch, getState) => {
  try {
    dispatch({
      type: "SIGNIN_REQUEST",
    });
    const data = await axios.post("http://localhost:3001/users/signin", {
      username,
      password,
    });
    dispatch({
      type: "SIGNIN_SUCCESS",
      payload: {
        accessToken: data.data.accessToken,
      },
    });
  } catch (error) {
    dispatch({
      type: "SIGNIN_ERROR",
      payload: error.response.data,
    });
  }
};
