import React from "react";
import {
  Card,
  CardContent,
  CardActions,
  IconButton,
  MenuItem,
  Select,
  FormControl,
  Grid,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { deletetask, setstatus } from "../../redux/actions/gettasks.action";
const CardContainer = styled.div`
  margin-bottom: 20px;
`;

const CardTitle = styled.h1`
  margin: 8px 0;
  font-size: 22px;
`;

const Task = ({ id, title, description, status, qty }) => {
  const dispatch = useDispatch();

  let history = useHistory();

  const deleteTask = () => {
    dispatch(deletetask(id));
  };

  const editTask = () => {
    history.push("/tasks/edit/" + id);
  };

  const handleStatusChange = (e) => {
    dispatch(setstatus(id, e.target.value));
  };

  return (
    <CardContainer>
      <Card raised={true}>
        <CardContent>
          <CardTitle>{title}</CardTitle>
          {description}
        </CardContent>
        <CardActions style={{ padding: "14px" }} disableSpacing>
          <Grid
            justify="space-between" // Add it here :)
            container
          >
            <Grid item>
              <FormControl style={{ width: "140px" }}>
                <Select
                  value={status}
                  onChange={handleStatusChange}
                  displayEmpty
                >
                  <MenuItem value={"PENDING"}>PENDING</MenuItem>
                  <MenuItem value={"PROGRESS"}>PROGRESS</MenuItem>
                  <MenuItem value={"REVIEW"}>REVIEW</MenuItem>
                  <MenuItem value={"DONE"}>DONE</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <p>Quantity: {qty}</p>

            <Grid item>
              <IconButton onClick={editTask}>
                <EditIcon color="primary" />
              </IconButton>
              <IconButton onClick={deleteTask}>
                <DeleteIcon color="error" />
              </IconButton>
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    </CardContainer>
  );
};

export default Task;
