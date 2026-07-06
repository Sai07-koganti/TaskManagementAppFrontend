import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import StatCard from "../components/StatCard";
import RecentTasks from "../components/RecentTasks";
import TaskChart from "../components/TaskChart";
import { useTasks } from "../context/TaskContext";
import ActivityFeed from "../components/ActivityFeed";

function Dashboard({}) {
  const { tasks } = useTasks();

  const total = tasks.length;

  const completed = tasks.filter((task) => task.status === "Completed").length;

  const pending = tasks.filter((task) => task.status === "Pending").length;

  const progress = tasks.filter((task) => task.status === "In Progress").length;

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2 ">
          <Sidebar />
        </div>
        <div className="col-md-10 ">
          <Navbar />
          <div
            className="p-4 mb-4 rounded"
            style={{ background: "linear-gradient(90deg,#7c3aed,#4f46e5)" }}
          >
            <h2>Welcome Back 👋</h2>
            <p>Manage your tasks efficiently.</p>
          </div>

          <div className="container mt-4">
            <div className="row g-4">
              <div className="col-md-3">
                <StatCard title="Total Tasks" count={total} />
              </div>

              <div className="col-md-3">
                <StatCard title="Completed" count={completed} />
              </div>

              <div className="col-md-3">
                <StatCard title="Pending" count={pending} />
              </div>

              <div className="col-md-3">
                <StatCard title="In Progress" count={progress} />
              </div>
            </div>

            <div className="row mt-4">
              <div className="col-md-6">
                <TaskChart />
              </div>

              <div className="col-md-6">
                <RecentTasks />
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-md-12">
                <ActivityFeed />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
