import { BrowserRouter as Router, Switch } from "react-router-dom";
import Route from "./handleRoutes";
import signIn from "../pages/signIn";
import SignUp from "../pages/signUp";
import Main from "../pages/main";

export default function Routes() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={Main} isPrivate />
          <Route exact path="/signin" component={signIn} />
          <Route exact path="/signup" component={SignUp} />
        </Switch>
      </Router>
    </>
  );
}
