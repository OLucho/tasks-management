import { Alert } from "@material-ui/lab";
import AlertError from "./alert-error";

export default function Error({ error }) {
  return Array.isArray(error) ? (
    error.map((e) => <AlertError error={e} />)
  ) : (
    <AlertError error={error} />
  );
}
