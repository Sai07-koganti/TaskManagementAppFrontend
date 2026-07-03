export const getTaskStats =
 (tasks) => {

  return {

   total:
    tasks.length,

   completed:
    tasks.filter(
      task =>
      task.status ===
      "Completed"
    ).length,

   pending:
    tasks.filter(
      task =>
      task.status ===
      "Pending"
    ).length,

   progress:
    tasks.filter(
      task =>
      task.status ===
      "In Progress"
    ).length

  };

};