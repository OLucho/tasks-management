import Box from "@material-ui/core/Box";
import { Container, makeStyles } from "@material-ui/core";
import { useAuth } from "../../hooks/auth";
import { useTasks } from "../../hooks/tasks";
import { useEffect } from "react";
import TasksList from "../../components/tasks/tasksList";
import TaskForm from "../../components/tasks/task-create-form";

export default function Main() {
  const { user } = useAuth();
  const { getTasks, tasks } = useTasks();

  useEffect(() => {
    try {
      getTasks();
    } catch (error) {
      console.log(error);
    }
  }, [getTasks]);
  return (
    <Container>
      <Box display="flex" justifyContent="space-evenly">
        <div>
          <h1>Tasks Management</h1>
          <p>
            Hello <span>{user.username}</span>
          </p>
        </div>
        <TaskForm />
      </Box>
      <Box display="flex" flexDirection="column" alignItems="center">
        {tasks.length !== 0 ? <TasksList tasks={tasks} /> : <p>No tasks yet</p>}
      </Box>
    </Container>
  );
}
