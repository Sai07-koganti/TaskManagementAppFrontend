import { useTasks } from "../context/TaskContext";
function RecentTasks() {

 const { tasks } = useTasks();
 const recentTasks =[...tasks]
      .reverse()
      .slice(0, 5);

  return (
    <div className="task-table p-3 mt-4">

      <h4>Recent Tasks</h4>

      <table className="table table-dark mt-3">

        <thead>
          <tr>
            <th>ID</th>
            <th>Task</th>
            <th>Status</th>
            <th>description</th>
          </tr>
        </thead>

        <tbody>

          {recentTasks.map((task,index) => (
            <tr key={task.id}>
              <td>{index + 1}</td>
              <td>{task.title}</td>
              <td>{task.status === "Completed" ? <span className="badge bg-success">Completed</span> : <span className="badge bg-warning">Pending</span>}</td>
              <td>{task.description}</td>
            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}

export default RecentTasks;