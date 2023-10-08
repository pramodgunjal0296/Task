import React, { useState, useEffect } from "react";
import "../App.css";
import axios from "axios";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: "", description: "" });
  const [editingTask, setEditingTask] = useState(null); // Initialize to null

  useEffect(() => {
    // Fetch tasks from the API
    axios.get("http://localhost:5000/tasks").then((response) => {
      setTasks(response.data);
    });
  }, []);

  const addTask = () => {
    axios.post("http://localhost:5000/tasks", newTask).then((response) => {
      if (response.status === 400) {
        alert("Empty fields not allowed");
      } else {
        setTasks([...tasks, response.data]);
        setNewTask({ title: "", description: "" });
        alert("Task added Successfully");
      }
    });
  };

  const startEditing = (task) => {
    setEditingTask(task); // Set the task to be edited
  };

  const cancelEditing = () => {
    setEditingTask(null); // Clear the editing task
  };

  const saveTask = (task) => {
    axios.put(`http://localhost:5000/tasks/${task._id}`, task).then(() => {
      setEditingTask(null);
      alert("Task Saved Successfully ,Please Refresh to see updated task");
    });
  };

  const deleteTask = (taskId) => {
    axios.delete(`http://localhost:5000/tasks/${taskId}`).then(() => {
      setTasks(tasks.filter((task) => task._id !== taskId));
      alert("Task deleted Successfully");
    });
  };

  return (
    <div>
      <h1 className=" w-screen flex items-center justify-center text-3xl mt-2 font-bold">
        Task Manager
      </h1>

      <div className="flex items-center justify-center flex-col gap-4">
        <h2 className="bold center">Add New Task</h2>
        <div>
          <div className="flex flex-row gap-2">
            <input
              type="text"
              className="shadow appearance-none border  border-gray-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Title"
              value={newTask.title}
              onChange={(e) =>
                setNewTask({ ...newTask, title: e.target.value })
              }
            />
            <p className="text-red-600">*</p>
          </div>
          <textarea
            type="text"
            rows="4"
            class="block p-2.5 mb-5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Description"
            value={newTask.description}
            onChange={(e) =>
              setNewTask({ ...newTask, description: e.target.value })
            }
          ></textarea>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={addTask}
          >
            Add
          </button>
        </div>
      </div>
      <div className="relative overflow-x-auto p-5  shadow-md sm:rounded-lg dark:bg-white flex items-center justify-center">
        <table className="w-full text-sm text-left text-gray-500 ">
          <thead>
            <tr>
              <th className="border py-2 ">Task</th>
              <th>Description</th>
              <th>Edit</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task._id}>
                {editingTask && editingTask._id === task._id ? (
                  <>
                    <td className="desc">
                      <input
                        type="text"
                        value={editingTask.title}
                        className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        onChange={(e) =>
                          setEditingTask({
                            ...editingTask,
                            title: e.target.value,
                          })
                        }
                      />
                    </td>
                    <td className="desc">
                      <input
                        type="text"
                        value={editingTask.description}
                        className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        onChange={(e) =>
                          setEditingTask({
                            ...editingTask,
                            description: e.target.value,
                          })
                        }
                      />
                    </td>
                    <td>
                      <button onClick={() => saveTask(editingTask)}>
                        Save
                      </button>
                    </td>
                    <td>
                      <button onClick={() => cancelEditing()}>Cancel</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td class="desc">
                      <span>{task.title}</span>
                    </td>
                    <td class="desc">
                      <span>{task.description}</span>
                    </td>
                    <td>
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => startEditing(task)}
                      >
                        Edit
                      </button>
                    </td>
                    <td>
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => deleteTask(task._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TaskList;
