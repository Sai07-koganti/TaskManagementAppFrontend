import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

import { Doughnut } from "react-chartjs-2";

import { useTasks } from "../context/TaskContext";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

function TaskChart() {

  const { tasks } = useTasks();

  // Empty State
  if (tasks.length === 0) {

    return (

      <div
        className="
        card shadow-sm
        p-5
        text-center
        h-100"
      >

        <div
          style={{
            fontSize: "70px"
          }}
        >
          📊
        </div>

        <h4 className="mt-3">
          No Analytics Available
        </h4>

        <p className="text-muted">
          Create your first task to
          view statistics and charts.
        </p>

      </div>

    );
  }

  const completed =
    tasks.filter(
      task =>
        task.status === "Completed"
    ).length;

  const pending =
    tasks.filter(
      task =>
        task.status === "Pending"
    ).length;

  const progress =
    tasks.filter(
      task =>
        task.status === "In Progress"
    ).length;

  const data = {

    labels: [
      "Completed",
      "Pending",
      "In Progress"
    ],

    datasets: [
      {
        data: [
          completed,
          pending,
          progress
        ],

        backgroundColor: [
          "#22c55e",
          "#f59e0b",
          "#7c3aed"
        ],

        borderWidth: 2
      }
    ]
  };

  const options = {

    responsive: true,

    plugins: {

      legend: {
        position: "bottom"
      }

    }

  };

  return (

    <div
      className="
      card shadow-sm
      p-4
      h-70"
    >

      <h5 className="mb-4">
        Task Analytics
      </h5>

      <Doughnut
        data={data}
        options={options}
      />

    </div>

  );

}

export default TaskChart;