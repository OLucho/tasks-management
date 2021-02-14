import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import TaskDeleteButton from "./task-deleteButton";

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

  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>{task.title}</CardContent>
      <CardContent>{task.description}</CardContent>
      <CardActions>
        <TaskDeleteButton id={task.id} />
      </CardActions>
    </Card>
  );
}
