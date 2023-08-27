import { TaskI } from 'api/tasks/models/get-task/get-task-res.model';
import { useEffect, useRef, useState } from 'react';
import { getFormattedTime } from 'utils/utils';

export const useTimeTracker = (tasks: TaskI[]) => {
  const [time, setTime] = useState(0);
  const intervalRef = useRef<number>();

  useEffect(() => {
    const task = tasks?.find((task) => !task?.endTime);

    if (task) {
      const { startTime } = task || {};
      const startTimeInSeconds = new Date(startTime)?.getTime();
      const currentTime = new Date().getTime();
      const timeElapsed = Math.ceil((currentTime - startTimeInSeconds) / 1000);
      setTime(timeElapsed);

      intervalRef.current = setInterval(() => {
        setTime((preValue) => preValue + 1);
      }, 1000);

      return () => clearInterval(intervalRef.current);
    }

    setTime(0);
    clearInterval(intervalRef.current);
  }, [tasks]);

  const formattedTime = getFormattedTime(time);

  return formattedTime;
};
