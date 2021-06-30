import axios from "axios";

export const gettasks = () => (dispatch) => {
  axios
    .get("http://localhost:3001/items", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
    .then((res) => {
      dispatch({
        type: "FETCH_ALL",
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch({
        type: "FETCH_ALL_ERROR",
        payload: err,
      })
    );
};
export const deletetask = (id) => (dispatch) => {
  axios
    .delete(`http://localhost:3001/items/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
    .then((res) => {
      dispatch({
        type: "DELETETASK",
        payload: res.data._id,
      });
    })
    .catch((err) =>
      dispatch({
        type: "DELETETASK_ERROR",
        payload: err,
      })
    );
};

export const create = (name, description, qty, index) => (dispatch) => {
  axios
    .post(
      `http://localhost:3001/items`,
      { name, description, qty, index },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    )
    .then((res) => {
      dispatch({
        type: "CREATE",
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch({
        type: "CREATE_ERROR",
        payload: err,
      })
    );
};

export const update = (id, name, description, qty, index) => (dispatch) => {
  axios
    .put(
      `http://localhost:3001/items/${id}`,
      { name, description, qty, index },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    )
    .then((res) => {
      dispatch({
        type: "UPDATE",
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch({
        type: "UPDATE_ERROR",
        payload: err,
      })
    );
};

export const setstatus = (id, status) => (dispatch) => {
  axios
    .patch(
      `http://localhost:3001/items/${id}/status`,
      { status: status },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    )
    .then((res) => {
      dispatch({
        type: "UPDATESTATUS",
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch({
        type: "UPDATESTATUS_ERROR",
        payload: err,
      })
    );
};

export const filter = (status) => (dispatch) => {
  axios
    .get(`http://localhost:3001/items`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      params: {
        status: status,
      },
    })
    .then((res) => {
      dispatch({
        type: "FILTER",
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch({
        type: "FILTER_ERROR",
        payload: err,
      })
    );
};
export const searching = (search) => (dispatch) => {
  axios
    .get(`http://localhost:3001/items`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      params: {
        search,
      },
    })
    .then((res) => {
      dispatch({
        type: "SEARCH",
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch({
        type: "SEARCH_ERROR",
        payload: err,
      })
    );
};
export const sorting = (sort) => (dispatch) => {
  axios
    .get(`http://localhost:3001/items`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      params: {
        sort,
      },
    })
    .then((res) => {
      dispatch({
        type: "SORT",
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch({
        type: "SORT_ERROR",
        payload: err,
      })
    );
};

export const updateindex = (result) => (dispatch) => {
  axios
    .patch(
      `http://localhost:3001/items`,
      { result },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    )
    .then((res) => {
      dispatch({
        type: "UPDATEINDEX",
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch({
        type: "UPDATEINDEX_ERROR",
        payload: err,
      })
    );
};

export const updateindexcomp = (result) => (dispatch) => {
  axios
    .put(
      `http://localhost:3001/items`,
      { result },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    )
    .then((res) => {
      dispatch({
        type: "UPDATECOMPINDEX",
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch({
        type: "UPDATECOMPINDEX_ERROR",
        payload: err,
      })
    );
};
