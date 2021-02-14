import Task from "./task";

export default function TasksList({ tasks }) {
  return tasks.map((task) => <Task task={task} />);
}
