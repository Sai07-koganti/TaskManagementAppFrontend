import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../api/api";
import { useUser } from "../context/UserContext";



function Navbar() {

  const navigate = useNavigate();
  const { user } = useUser();
  
  const logout = () => {
    if (!window.confirm("Are you sure you want to logout?"))
      return;
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="navbar navbar-dark bg-dark px-4">
      <div className="d-flex align-items-center">
        <img
    src={
        user.profileImage
            ? `http://localhost:8080/uploads/profile/${user.profileImage}`
            : "/Ntrimg1.jpeg"
          }
         alt="Profile"
          width="70"
          height="70"
          className="rounded-circle border border-light"
          style={{ objectFit: "cover" }}
        />
        <div className="ms-3">

          <h5 className="text-white mb-0">
            {user.name}
          </h5>

          <small className="text-light">
            {user.email}
          </small>
        </div>
      </div>

      <h3 className="text-white">
        Dashboard
      </h3>

      <div>

        <button
          className="btn btn-primary me-2"
          onClick={() => navigate("/tasks")}
        >
          + Add Task
        </button>

        <button
          className="btn btn-danger"
          onClick={logout}
        >
          Logout
        </button>

      </div>

    </nav>
  );
}

export default Navbar;