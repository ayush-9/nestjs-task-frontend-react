import React, { useState, useEffect } from "react";
import { TextField, FormControl, Button } from "@material-ui/core";
import styled from "styled-components";
import ErrorMessage from "../components/ErrorMessage";
import { useDispatch, useSelector } from "react-redux";
import { create, update } from "../redux/actions/gettasks.action";
import { useHistory, useParams } from "react-router-dom";

const FormWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FormContainer = styled.div`
  max-width: 480px;
  width: 100%;
  background-color: #f5f5f5;
  padding: 30px;
  border-radius: 5px;
`;

const CreateTaskPage = () => {
  let { slug } = useParams();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [index, setIndex] = useState(0);
  const [qty, setQty] = useState(0);
  const { tasks, error } = useSelector((state) => state.gettasksdata);
  const dispatch = useDispatch();
  let history = useHistory();

  useEffect(() => {
    if (slug) {
      setName(tasks.find((x) => x._id === slug)?.name);
      setDescription(tasks.find((x) => x._id === slug)?.description);
      setQty(tasks.find((x) => x._id === slug)?.qty);
      setIndex(tasks.find((x) => x._id === slug)?.index);
    }
  }, [slug, tasks]);
  const handleSubmitTask = () => {
    if (slug) {
      dispatch(update(slug, name, description, qty, index));
    } else {
      dispatch(create(name, description, qty, index));
    }

    resetForm();
    history.push("/tasks");
  };

  const resetForm = () => {
    setName("");
    setDescription("");
    setQty(0);
    setIndex(0);
  };

  return (
    <FormWrapper>
      <FormContainer>
        <Button
          style={{ float: "right" }}
          onClick={() => {
            history.push("/tasks");
          }}
        >
          &#10060;
        </Button>
        <h1>{slug ? "Edit task" : "Create a new task"}</h1>
        <p>
          {slug ? "Edit" : "Provide"} information about the task you wish to
          complete.
        </p>
        {error && <ErrorMessage message={error?.response?.data?.message} />}
        <FormControl fullWidth>
          <TextField
            name="name"
            label="Name"
            placeholder="Title"
            margin="normal"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormControl>
        <FormControl fullWidth>
          <TextField
            name="description"
            label="Description"
            placeholder="Description"
            multiline
            rows="8"
            margin="normal"
            variant="outlined"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </FormControl>
        <FormControl fullWidth>
          <TextField
            name="qty"
            label="Quantity"
            placeholder="Quantity"
            margin="normal"
            variant="outlined"
            value={qty}
            onChange={(e) =>
              setQty(
                e.target.value && !isNaN(parseInt(e.target.value))
                  ? parseInt(e.target.value)
                  : e.target.value
              )
            }
          />
        </FormControl>
        {slug ? (
          " "
        ) : (
          <FormControl fullWidth>
            <TextField
              name="index"
              label="Index"
              placeholder="Index"
              margin="normal"
              variant="outlined"
              value={index}
              onChange={(e) =>
                setIndex(
                  e.target.value && !isNaN(parseInt(e.target.value))
                    ? parseInt(e.target.value)
                    : e.target.value
                )
              }
            />
          </FormControl>
        )}
        <Button
          style={{ marginTop: "10px" }}
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleSubmitTask}
        >
          {slug ? "UPDATE" : "CREATE"} TASK
        </Button>
      </FormContainer>
    </FormWrapper>
  );
};

export default CreateTaskPage;
