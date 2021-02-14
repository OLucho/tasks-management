import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";

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
        <Button size="small" color="secondary">
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}
