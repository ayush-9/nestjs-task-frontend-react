import React, { useState, useEffect } from "react";
import { Fab, IconButton } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import SignOutIcon from "@material-ui/icons/ExitToApp";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Redirect } from "react-router-dom";
import {
  gettasks,
  updateindex,
  updateindexcomp,
} from "../../redux/actions/gettasks.action";
import Task from "../task/task";
import TasksFilters from "../../components/TasksFilters";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const TasksWrapper = styled.div`
  width: 100%;
  max-width: 860px;
  margin: auto;
  padding: 20px;
  box-sizing: border-box;
`;

const TasksHeader = styled.div`
  display: flex;
  justify-content: center;
  border-bottom: 3px solid rgb(220, 0, 78);
`;

const Title = styled.h1`
  width: 100%;
  color: rgb(220, 0, 78);
`;

const CreateButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const TasksContainer = styled.div`
  padding-top: 20px;
`;

const EmptyTasksPlaceholder = styled.p`
  color: #edf4ff;
  text-align: center;
  font-size: 22px;
`;

const SignOutIconContainer = styled.div`
  margin-left: 10px;

  .signOutIcon {
    fill: rgb(220, 0, 78);
  }
`;

function TasksPage() {
  let history = useHistory();

  const { tasks, error } = useSelector((state) => state.gettasksdata);
  const dispatch = useDispatch();
  const [redirectTo, setRedirctTo] = useState(false);

  useEffect(() => {
    (() => {
      if (error?.response?.data?.statusCode === 401) {
        handleSignOut();
      }
      if (!localStorage.getItem("accessToken")) {
        setRedirctTo(true);
      }
    })();
  });
  useEffect(() => {
    dispatch(gettasks());
  }, [dispatch]);

  const SignOut = () => {
    history.push("/signin");
    window.location.reload();
  };
  const handleSignOut = () => {
    localStorage.removeItem("accessToken");
    SignOut();
  };
  function handleOnDragEnd(result) {
    if (!result.destination) return;
    console.log(result);
    if (result.source.index > result.destination.index) {
      dispatch(updateindexcomp(result));
    } else {
      dispatch(updateindex(result));
    }
    // const [reorderedItem] = tasks.splice(result.source.index, 1);
    // tasks.splice(result.destination.index, 0, reorderedItem);
  }

  const renderTasks = () => {
    if (tasks.length === 0) {
      return (
        <EmptyTasksPlaceholder>
          {error ? "Unauthorised" + error : "No tasks available. Create one?"}
        </EmptyTasksPlaceholder>
      );
    }

    return tasks.map((task, index) => (
      <Draggable key={task._id} draggableId={task._id} index={task.index}>
        {(provided) => (
          <span
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <Task
              key={task._id}
              id={task._id}
              title={task.name}
              qty={task.qty}
              description={task.description}
              status={task.status}
            />
          </span>
        )}
      </Draggable>
    ));
  };
  if (redirectTo) {
    return <Redirect to="/signin" />;
  } else {
    return (
      <TasksWrapper>
        <TasksHeader>
          <Title>Tasks Made Easy.</Title>

          <CreateButtonContainer>
            <Fab
              variant="extended"
              onClick={() => {
                history.push("/tasks/create");
              }}
            >
              <AddIcon />
              Create Task
            </Fab>

            <SignOutIconContainer>
              <IconButton onClick={handleSignOut}>
                <SignOutIcon className="signOutIcon" />
              </IconButton>
            </SignOutIconContainer>
          </CreateButtonContainer>
        </TasksHeader>
        <TasksFilters />
        <br></br>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="todos">
            {(provided) => (
              <TasksContainer
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {renderTasks()}

                {provided.placeholder}
              </TasksContainer>
            )}
          </Droppable>
        </DragDropContext>
      </TasksWrapper>
    );
  }
}

export default TasksPage;
