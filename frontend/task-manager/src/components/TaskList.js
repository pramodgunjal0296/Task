import React, { useState, useEffect } from "react";
import axios from "axios";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: "", description: "" });
  const [editingTask, setEditingTask] = useState();

  useEffect(() => {
    // Fetch tasks from the API
    axios.get("http://localhost:5000/tasks").then((response) => {
      setTasks(response.data);
    });
  }, []);

  const addTask = () => {
    axios.post("http://localhost:5000/tasks", newTask).then((response) => {
      setTasks([...tasks, response.data]);
      setNewTask({ title: "", description: "" });
    });
  };

  const editTask = (task) => {
    axios.put(`http://localhost:5000/tasks/${task._id}`, task).then(() => {
      setEditingTask(null);
    });
  };

  const deleteTask = (taskId) => {
    axios.delete(`http://localhost:5000/tasks/${taskId}`).then(() => {
      setTasks(tasks.filter((task) => task._id !== taskId));
    });
  };

  return (
    <div>
      <h1>Task Manager</h1>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            {editingTask?._id === task._id ? (
              <div>
                <input
                  type="text"
                  value={editingTask.title}
                  onChange={(e) =>
                    setEditingTask({ ...task, title: e.target.value })
                  }
                />
                <button onClick={() => editTask(task)}>Save</button>
              </div>
            ) : (
              <div>
                <span>Title : {task.title}</span>
                <br />
                <span>Description: {task.description}</span>
                <button onClick={() => setEditingTask(task)}>Edit</button>
                <button onClick={() => deleteTask(task._id)}>Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>
      <h2>Add New Task</h2>
      <div>
        <input
          type="text"
          placeholder="Title"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={newTask.description}
          onChange={(e) =>
            setNewTask({ ...newTask, description: e.target.value })
          }
        />
        <button onClick={addTask}>Add</button>
      </div>
    </div>
  );
};

export default TaskList;
