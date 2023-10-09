import { Route, Routes } from "react-router-dom";
import configureRoute from "./routes";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import TaskList from "../components/TaskList";

const RoutesData = () => {
  return (
    <>
      <Routes>
        {configureRoute.map((item, key) =>
          item.private ? (
            <Route
              key={key}
              path={item.path}
              exact={item.exact}
              element={
                <PrivateRoute>
                  <TaskList />
                </PrivateRoute>
              }
            />
          ) : (
            //   <Route
            //     key={key}
            //     exact={item.exact}
            //     path={item.path}
            //     name={item.name}
            //     element={item.element}
            //   />
            // </Route>
            <Route key={key} exact element={<PublicRoute />}>
              <Route
                key={key}
                exact={item.exact}
                path={item.path}
                name={item.name}
                element={item.element}
              />
            </Route>
          )
        )}
      </Routes>
    </>
  );
};

export default RoutesData;
