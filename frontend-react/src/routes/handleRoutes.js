import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function HandleRoutes({
  isPrivate = false,
  component: Component,
  ...rest
}) {
  const { user } = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) => {
        return isPrivate === !!user ? (
          <>
            <Component />
          </>
        ) : (
          <Redirect
            to={{
              pathname: isPrivate ? "/signin" : "/",
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
}
