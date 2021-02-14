import Task from "./task";

export default function TasksList({ tasks }) {
  return tasks.map((task) => <Task key={task.id} task={task} />);
}
