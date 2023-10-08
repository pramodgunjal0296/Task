import Login from "./components/Login";
import TaskList from "./components/TaskList";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/task" element={<TaskList />} />
      </Routes>
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
