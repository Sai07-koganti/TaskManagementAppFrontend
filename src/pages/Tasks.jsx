import { useState, useEffect } from "react";
import { useTasks } from "../context/TaskContext";
import { toast } from "react-toastify";
import EmptyState from "../components/EmptyState"
import api from "../api/api";

function Tasks() {
 const {tasks,fetchTasks,activities,setActivities} = useTasks();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Pending");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");

  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [editingId, setEditingId] = useState(null);

  const addTask = async () => {

  if (!title.trim()) return;

  try {

    await api.post("/tasks", {
      title,
      description,
      status,
      priority,
      dueDate
    });

    await fetchTasks();

    toast.success("Task Added Successfully");

    setActivities(prev => [
      {
        id: Date.now(),
        action: `Created task "${title}"`,
        time: new Date().toLocaleString()
      },
      ...prev
    ]);

    setTitle("");
    setDescription("");
    setStatus("Pending");
    setPriority("Medium");
    setDueDate("");

  } catch(error) {

    console.error(error);
    toast.error("Failed To Add Task");

  }
};
  const updateTask = async () => {

  try {

    await api.put(
      `/tasks/${editingId}`,
      {
        title,
        description,
        status,
        priority,
        dueDate
      }
    );

    await fetchTasks();

    toast.info("Task Updated");

    setActivities(prev => [
      {
        id: Date.now(),
        action: `Updated task "${title}"`,
        time: new Date().toLocaleString()
      },
      ...prev
    ]);

    setEditingId(null);

    setTitle("");
    setDescription("");
    setStatus("Pending");
    setPriority("Medium");
    setDueDate("");

  } catch(error) {

    console.error(error);
    toast.error("Update Failed");

  }
};
  const deleteTask = async (id) => {

  const confirmed =
    window.confirm(
      "Delete this task?"
    );

  if (!confirmed) return;

  try {

    const taskToDelete =
      tasks.find(
        task => task.id === id
      );

    await api.delete(
      `/tasks/${id}`
    );

    await fetchTasks();

    toast.error(
      "Task Deleted"
    );

    setActivities(prev => [
      {
        id: Date.now(),
        action: `Deleted task "${taskToDelete.title}"`,
        time: new Date().toLocaleString()
      },
      ...prev
    ]);

  } catch(error) {

    console.error(error);
    toast.error(
      "Delete Failed"
    );

  }
};
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesStatus =
      filterStatus === "All" || task.status === filterStatus;

    return matchesSearch && matchesStatus;
  });
  const getStatusBadge = (status) => {
    switch (status) {
      case "Completed":
        return "success";

      case "Pending":
        return "warning";

      default:
        return "primary";
    }
  };
  const getPriorityBadge = (priority) => {
    switch (priority) {
      case "High":
        return "danger";

      case "Medium":
        return "warning";

      default:
        return "success";
    }
  };

  return (
    <div className="container mt-4">
      <h2>Task Management</h2>

      <div className="card bg-dark text-white p-4 mb-4">
        <h4>Add Task</h4>

        <input
          className="form-control mb-2"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="form-control mb-2"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <select
          className="form-control mb-2"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option>Pending</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>

        <select
          className="form-control mb-2"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <input
          type="date"
          className="form-control mb-3"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />

        {editingId ? (
          <button className="btn btn-success" onClick={updateTask}>
            Update Task
          </button>
        ) : (
          <button className="btn btn-primary" onClick={addTask}>
            Add Task
          </button>
        )}
      </div>
      <div className="row mb-3">
        <div className="col-md-6">
          <input
            className="form-control"
            placeholder="Search Tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="col-md-3">
          <select
            className="form-control"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option>All</option>
            <option>Pending</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>
        </div>
      </div>
         {filteredTasks.length === 0 ? (
            <EmptyState />
          ) : (
      <table className="table table-dark">
        <thead>
          <tr>
            <th>Title</th>
            <th>Status</th>
            <th>Priority</th>
            <th>Due Date</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {filteredTasks.map((task) => (
            <tr key={task.id}>
              <td>{task.title}</td>

              <td>
                {" "}
                <span className={`badge bg-${getStatusBadge(task.status)}`}>
                  {task.status}
                </span>
              </td>
              <td>
                <span className={`badge bg-${getPriorityBadge(task.priority)}`}>
                  {task.priority}
                </span>
              </td>

              <td>{task.dueDate}</td>

              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => {
                    setEditingId(task.id);
                    setTitle(task.title);
                    setDescription(task.description);
                    setStatus(task.status);
                    setPriority(task.priority);
                    setDueDate(task.dueDate);
                  }}
                >
                  {" "}
                  Edit{" "}
                </button>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteTask(task.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
       
      </table>
        )}
    </div>
  );
}

export default Tasks;
