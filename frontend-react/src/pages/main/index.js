import Box from "@material-ui/core/Box";
import { Container, IconButton } from "@material-ui/core";
import SignOutIcon from "@material-ui/icons/ExitToApp";

import { useAuth } from "../../hooks/auth";
import { useTasks } from "../../hooks/tasks";
import { useEffect } from "react";
import TasksList from "../../components/tasks/tasksList";
import TaskForm from "../../components/tasks/task-create-form";
import TasksFilter from "../../components/tasks/task-filter";
import { Alert } from "@material-ui/lab";
import Error from "../../components/error";

export default function Main() {
  const { user, signOut } = useAuth();
  const { getTasks, tasks, error } = useTasks();

  useEffect(() => {
    try {
      getTasks();
    } catch (error) {
      console.log(error);
    }
  }, [getTasks]);

  return (
    <Container display="flex" alignItems="center">
      <Box display="flex" justifyContent="space-evenly">
        <div>
          <h1>Tasks Management</h1>
          <p>
            Hello <span>{user.username}</span>
          </p>
          <TaskForm />
        </div>
        <IconButton>
          <SignOutIcon className="signOutIcon" onClick={signOut} />
        </IconButton>
      </Box>

      <Box display="flex" flexDirection="column" alignItems="center">
        {error && <Error error={error} />}
        <TasksFilter />
        {tasks.length !== 0 ? (
          <TasksList tasks={tasks} />
        ) : (
          <p>No tasks found</p>
        )}
      </Box>
    </Container>
  );
}
