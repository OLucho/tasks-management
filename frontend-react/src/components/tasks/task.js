import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import TaskDeleteButton from "./task-deleteButton";
import { FormControl, Grid, MenuItem, Select } from "@material-ui/core";
import { useTasks } from "../../hooks/tasks";

const useStyles = makeStyles({
  root: {
    maxWidth: 900,
    width: "100%",
    alignItems: "center",
    margin: "1rem 0",
    textAlign: "center",
  },
  media: {
    height: 140,
  },
  content: {},
});

export default function Task({ task }) {
  const classes = useStyles();
  const [status, setStatus] = useState(task.status);
  const { handleStatusChange } = useTasks();

  const handleStatus = (e) => {
    setStatus(e.target.value);
    handleStatusChange(task.id, e.target.value);
  };

  return (
    <Card className={classes.root}>
      <CardContent>
        <Grid item>
          <FormControl style={{ width: "140px" }}>
            <Select value={status} onChange={handleStatus} displayEmpty>
              <MenuItem value={"OPEN"}>Open</MenuItem>
              <MenuItem value={"IN_PROGRESS"}>In Progress</MenuItem>
              <MenuItem value={"DONE"}>Done</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </CardContent>
      <CardContent className={classes.content}>{task.title}</CardContent>
      <CardContent>{task.description}</CardContent>
      <CardActions>
        <TaskDeleteButton id={task.id} />
      </CardActions>
    </Card>
  );
}
