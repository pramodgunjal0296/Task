const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(
  "mongodb+srv://pramodgunjal1996:Pramod9762@cluster0.cjvg5x1.mongodb.net/mern",
  { useNewUrlParser: true, useUnifiedTopology: true }
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Middleware
app.use(bodyParser.json());

// Task model
const Task = mongoose.model("Task", {
  title: String,
  description: String,
});

// Create a new task
app.post("/tasks", async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: "Invalid task data" });
  }
});

// Get all tasks
app.get("/tasks", async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

// Get a single task by ID
app.get("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      res.status(404).json({ error: "Task not found" });
    } else {
      res.json(task);
    }
  } catch (error) {
    res.status(400).json({ error: "Invalid task ID" });
  }
});

// Update a task by ID
app.put("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!task) {
      res.status(404).json({ error: "Task not found" });
    } else {
      res.json(task);
    }
  } catch (error) {
    res.status(400).json({ error: "Invalid task data" });
  }
});

// Delete a task by ID
app.delete("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndRemove(req.params.id);
    if (!task) {
      res.status(404).json({ error: "Task not found" });
    } else {
      res.json({ message: "Task deleted successfully" });
    }
  } catch (error) {
    res.status(400).json({ error: "Invalid task ID" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
