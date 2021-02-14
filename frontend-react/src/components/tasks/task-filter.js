import {
  Button,
  Container,
  FormControl,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { useState } from "react";
import { useTasks } from "../../hooks/tasks";

export default function TasksFilter() {
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");

  const { getTasksFiltered } = useTasks();

  const handleFilters = async (status, search) => {
    getTasksFiltered(status, search);
  };

  return (
    <Container style={{ textAlign: "center", margin: "2rem 0" }}>
      <FormControl style={{ width: "220px", margin: "0 3rem" }}>
        <Select
          displayEmpty
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <MenuItem value="">No status filter</MenuItem>
          <MenuItem value={"OPEN"}>Open</MenuItem>
          <MenuItem value={"IN_PROGRESS"}>In Progress</MenuItem>
          <MenuItem value={"DONE"}>Done</MenuItem>
        </Select>
      </FormControl>

      <FormControl style={{ width: "220px" }}>
        <TextField
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </FormControl>
      <Button
        variant="outlined"
        color="primary"
        style={{ marginLeft: "1rem" }}
        onClick={() => handleFilters(status, search)}
      >
        Filter
      </Button>
    </Container>
  );
}
