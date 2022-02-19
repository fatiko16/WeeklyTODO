export const getWorkDoneAndRemaining = (tasks) => {
  let workDone = 0;
  let workRemaining = 0;
  tasks.forEach((task) => {
    if (task.isDone) {
      workDone += parseInt(task.duration);
    } else if (!task.isDone) {
      workRemaining += parseInt(task.duration);
    }
  });
  return { workDone, workRemaining };
};
