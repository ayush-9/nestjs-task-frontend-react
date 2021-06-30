import React, { useState, useEffect } from "react";
import {
  Grid,
  FormControl,
  Select,
  MenuItem,
  TextField,
  InputAdornment,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import SearchIcon from "@material-ui/icons/Search";
import { filter, searching, sorting } from "../redux/actions/gettasks.action";
import styled from "styled-components";

const FiltersContainer = styled.div`
  margin-top: 20px;
`;

const ControlContainer = styled.div`
  background-color: #f5f5f5;
  border-radius: 5px;
  padding: 10px;
`;

const TasksFilters = () => {
  const [status, setstatus] = useState("");
  const [sort, setsort] = useState(1);
  const [search, setsearch] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(searching(search));
  }, [dispatch, search]);
  useEffect(() => {
    dispatch(filter(status));
  }, [dispatch, status]);
  useEffect(() => {
    dispatch(sorting(sort));
  }, [dispatch, sort]);

  const handleStatusFilterChange = (e) => {
    setstatus(e.target.value);
  };
  const handleSortFilterChange = (e) => {
    setsort(e.target.value);
  };

  const handleSearchTermChange = (e) => {
    setsearch(e.target.value);
  };

  return (
    <FiltersContainer>
      <Grid justify="space-between" container>
        <Grid item>
          <ControlContainer>
            <FormControl style={{ width: "220px" }}>
              <TextField
                placeholder="Search Tasks Here..."
                value={search}
                onChange={handleSearchTermChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>
          </ControlContainer>
        </Grid>
        <Grid item>
          <ControlContainer>
            <FormControl style={{ width: "220px" }}>
              <Select
                value={sort}
                onChange={handleSortFilterChange}
                displayEmpty
              >
                <MenuItem value={1}>Custom Drag/Drop Ordering</MenuItem>
                <MenuItem value={-1}>Last Added/Updated first</MenuItem>
              </Select>
            </FormControl>
          </ControlContainer>
        </Grid>

        <Grid item>
          <ControlContainer>
            <FormControl style={{ width: "220px" }}>
              <Select
                value={status}
                onChange={handleStatusFilterChange}
                displayEmpty
              >
                <MenuItem value="">No status filter</MenuItem>
                <MenuItem value={"PENDING"}>PENDING</MenuItem>
                <MenuItem value={"PROGRESS"}>PROGRESS</MenuItem>
                <MenuItem value={"REVIEW"}>REVIEW</MenuItem>
                <MenuItem value={"DONE"}>DONE</MenuItem>
              </Select>
            </FormControl>
          </ControlContainer>
        </Grid>
      </Grid>
    </FiltersContainer>
  );
};

export default TasksFilters;
