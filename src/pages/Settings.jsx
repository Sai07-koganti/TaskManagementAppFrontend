import { useState, useEffect } from "react";

function Settings() {

  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme =
      localStorage.getItem("theme");

    return savedTheme !== "light";
  });

  useEffect(() => {

    if (darkMode) {
      document.body.classList.add("dark-theme");
      document.body.classList.remove("light-theme");

      localStorage.setItem(
        "theme",
        "dark"
      );

    } else {

      document.body.classList.add("light-theme");
      document.body.classList.remove("dark-theme");

      localStorage.setItem(
        "theme",
        "light"
      );

    }

  }, [darkMode]);

  return (

    <div className="container mt-4">

      <div className="card p-4">

        <h3>Settings</h3>

        <div className="form-check form-switch mt-3">

          <input
            className="form-check-input"
            type="checkbox"
            checked={darkMode}
            onChange={() =>
              setDarkMode(!darkMode)
            }
          />

          <label
            className="form-check-label"
          >
            {darkMode
              ? "Dark Mode 🌙"
              : "Light Mode ☀️"}
          </label>

        </div>

      </div>

    </div>

  );
}

export default Settings;