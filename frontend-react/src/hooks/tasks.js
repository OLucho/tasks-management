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
          const currentTasks = tasks;
          const newTasks = currentTasks.filter((task) => task.id !== id);
          setTasks(newTasks);
        }
      } catch (error) {
        console.log(error.message);
      }
    },
    [tasks]
  );

  const createTask = useCallback(
    async (title, description) => {
      try {
        const res = await api.post(`/tasks/`, { title, description });
        if (res.status === 201) {
          const currentTasks = tasks;
          const newTasks = [...currentTasks, res.data];
          setTasks(newTasks);
        }
      } catch (error) {
        console.log(error.message);
      }
    },
    [tasks]
  );

  const handleStatusChange = useCallback(async (id, status) => {
    try {
      const res = await api.patch(`/tasks/${id}/status`, { status });
      console.log(res);
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  return (
    <TasksContext.Provider
      value={{
        tasks,
        getTasks,
        deleteTask,
        createTask,
        handleStatusChange,
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
