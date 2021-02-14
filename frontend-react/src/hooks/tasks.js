import { createContext, useContext, useCallback, useState } from "react";
import api from "../services/api";

const TasksContext = createContext();

export function TasksProvider({ children }) {
  const [tasks, setTasks] = useState([]);

  const getTasks = useCallback(async () => {
    try {
      const res = await api.get("/tasks");
      if (res.status === 200) {
        setTasks(res.data);
      }
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  const deleteTask = useCallback(
    async (id) => {
      try {
        const res = await api.delete(`/tasks/${id}`);
        if (res.status === 200) {
          let currentTasks = tasks;
          let newTasks = currentTasks.filter((task) => task.id !== id);
          setTasks(newTasks);
        }
      } catch (error) {
        console.log(error.message);
      }
    },
    [tasks]
  );
  return (
    <TasksContext.Provider
      value={{
        tasks,
        getTasks,
        deleteTask,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error("useTasks must be used within a TasksProvider  ");
  }
  return context;
}
