import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import signIn from "../pages/signIn";
import SignUp from "../pages/signUp";
export default function Routes() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" />
          <Route path="/signin" component={signIn} />
          <Route path="/signup" component={SignUp} />
        </Switch>
      </Router>
    </>
  );
}
