import { useContext, useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";

import { AuthContext } from "../contexts/AuthContext";

interface Props {
  children?: any;
  component?: React.FC;
  exact: boolean;
  path: string;
}

const PrivateRoute: React.FC<Props> = (props) => {
  const user = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const { children, ...rest } = props;

  useEffect(() => {
    if (user) {
      setLoading(false);
    } else {
      setTimeout(() => setLoading(false), 1500); // TODO: Better handling of this case
    }
  }, [user]);

  return (
    <>
      {!loading && (
        <Route
          {...rest}
          render={(renderProps) =>
            user ? (
              children
            ) : (
              <Redirect
                to={{
                  pathname: "/",
                  state: { from: renderProps.location },
                }}
              />
            )
          }
        />
      )}
    </>
  );
};

export default PrivateRoute;
