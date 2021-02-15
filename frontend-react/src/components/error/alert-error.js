import { Alert } from "@material-ui/lab";

export default function AlertError({ error }) {
  return (
    <Alert
      severity="error"
      style={{ margin: "0.4rem 0", textTransform: "capitalize" }}
    >
      {error}
    </Alert>
  );
}
