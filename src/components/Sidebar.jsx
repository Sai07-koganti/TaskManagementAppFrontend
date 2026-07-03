import { FaHome, FaTasks, FaUser, FaCog, FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";

function Sidebar() {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="btn btn-primary d-md-none m-2"
        onClick={() => setShowMenu(!showMenu)}
      >
        <FaBars />
      </button>

      {/* Sidebar */}
      <div className={`sidebar ${showMenu ? "d-block" : "d-none"} d-md-block`}>
        <h3
          className="mb-5 text-center fw-bold"
          style={{
            color: "#67e8f9",
          }}>
          ⚡ TaskFlow
        </h3>

        <ul className="nav flex-column">
          <li className="nav-item mb-3">
            <Link className="nav-link text-white" to="/dashboard">
              <FaHome className="me-2" />
              Dashboard
            </Link>
          </li>

          <li className="nav-item mb-3">
            <Link className="nav-link text-white" to="/tasks">
              <FaTasks className="me-2" />
              Tasks
            </Link>
          </li>

          <li className="nav-item mb-3">
            <Link className="nav-link text-white" to="/profile">
              <FaUser className="me-2" />
              Profile
            </Link>
          </li>

          <li className="nav-item mb-3">
            <Link className="nav-link text-white" to="/settings">
              <FaCog className="me-2" />
              Settings
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Sidebar;
