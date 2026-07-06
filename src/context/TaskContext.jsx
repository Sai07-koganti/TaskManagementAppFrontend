import {
  createContext,
  useContext,
  useState,
  useEffect
} from "react";

import api from "../api/api";

const TaskContext = createContext();

export const TaskProvider = ({
  children
}) => {

  const [tasks, setTasks] =
    useState([]);

  const [activities, setActivities] =
    useState(() => {

      const saved =
        localStorage.getItem(
          "activities"
        );

      return saved
        ? JSON.parse(saved)
        : [];
    });

  const fetchTasks = async () => {

    try {

      const response =
        await api.get(
          "/tasks"
        );

      setTasks(
        response.data
      );

    } catch (error) {

      console.error(
        "Error fetching tasks:",
        error
      );

    }
  };

  useEffect(() => {

    fetchTasks();

  }, []);

  useEffect(() => {

    localStorage.setItem(
      "activities",
      JSON.stringify(
        activities
      )
    );

  }, [activities]);

  const value = {
    tasks,
    setTasks,
    fetchTasks,
    activities,
    setActivities
  };

  return (
    <TaskContext.Provider
      value={value}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () =>
  useContext(TaskContext);
