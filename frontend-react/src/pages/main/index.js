import Box from "@material-ui/core/Box";
import { Container, IconButton } from "@material-ui/core";
import { useAuth } from "../../hooks/auth";
import { useTasks } from "../../hooks/tasks";
import { useEffect } from "react";
import TasksList from "../../components/tasks/tasksList";
import TaskForm from "../../components/tasks/task-create-form";
import SignOutIcon from "@material-ui/icons/ExitToApp";

export default function Main() {
  const { user, signOut } = useAuth();
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
          <TaskForm />
        </div>
        <IconButton>
          <SignOutIcon className="signOutIcon" onClick={signOut} />
        </IconButton>
      </Box>
      <Box display="flex" flexDirection="column" alignItems="center">
        {tasks.length !== 0 ? <TasksList tasks={tasks} /> : <p>No tasks yet</p>}
      </Box>
    </Container>
  );
}
