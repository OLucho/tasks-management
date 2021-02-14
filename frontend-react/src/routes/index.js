import { BrowserRouter as Router, Switch } from "react-router-dom";
import Route from "./handleRoutes";
import signIn from "../pages/signIn";
import SignUp from "../pages/signUp";
export default function Routes() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={signIn} />
          <Route path="/signin" component={signIn} />
          <Route path="/signup" component={SignUp} />
        </Switch>
      </Router>
    </>
  );
}
