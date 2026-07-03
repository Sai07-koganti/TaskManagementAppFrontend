import { useTasks } from "../context/TaskContext";
function ActivityFeed() {
  const { activities } = useTasks();

  return (
    <div className="stat-card">
      <h5>Recent Activity</h5>

      <ul
        className="
        list-group
        mt-3"
      >
        {activities.slice(0, 5).map((activity) => (
          <li key={activity.id} className="list-group-item">
            {activity.action}
            <br />
            <small>{activity.time}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ActivityFeed;
