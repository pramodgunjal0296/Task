// import Login from "./components/Login";
// import TaskList from "./components/TaskList";
// import { Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import RoutesData from "./routes";

function App() {
  return (
    <div>
      <ToastContainer />
      <RoutesData />
    </div>
  );
}

export default App;
