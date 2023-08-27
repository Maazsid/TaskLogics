import { TaskI } from 'api/tasks/models/get-task/get-task-res.model';
import { GroupedTask, TaskListI, TaskWeekDay } from '../models/task-list.model';
import { useMemo } from 'react';
import dayjs from 'dayjs';

export const useGroupTaskList = (tasks: TaskI[] | undefined) => {
  const taskList: TaskListI = useMemo(() => {
    if (!tasks) return [];

    const firstDayOfWeek = dayjs()?.startOf('week');
    const lastDayOfWeek = dayjs()?.endOf('week');
    const firstDayOfLastWeek = firstDayOfWeek?.subtract(1, 'day')?.startOf('week');
    const lastDayOfLastWeek = firstDayOfWeek?.subtract(1, 'day')?.endOf('week');

    const currentWeekRange = `${firstDayOfWeek?.format('MMM DD')} - ${lastDayOfWeek?.format('MMM DD')}`;
    const lastWeekRange = `${firstDayOfLastWeek?.format('MMM DD')} - ${lastDayOfLastWeek?.format('MMM DD')}`;

    if (!tasks) {
      return [];
    }

    const groupedTasksList = tasks
      ?.filter((t) => t?.startTime && t?.endTime)
      ?.reduce((acc: TaskListI, curr) => {
        const startTime = dayjs(curr?.startTime);
        const endTime = dayjs(curr?.endTime);
        const startOfWeek = startTime?.startOf('week')?.format('MMM DD');
        const endOfWeek = startTime?.endOf('week')?.format('MMM DD');
        const weekRange = `${startOfWeek} - ${endOfWeek}`;
        let weekName: string;

        if (weekRange === currentWeekRange) weekName = 'This week';
        else if (weekRange === lastWeekRange) weekName = 'Last week';
        else weekName = weekRange;

        const dayName = startTime?.format('ddd, MMM DD');

        const totalTimeOfTask = endTime?.diff(startTime, 's');

        const isWeekRangeAlreadyExist = acc?.some((task: any) => task?.weekName === weekName);

        if (!isWeekRangeAlreadyExist) {
          acc?.push({
            weekName: weekName,
            weekTotalTime: totalTimeOfTask,
            days: [
              {
                dayName: dayName,
                dayTotalTime: totalTimeOfTask,
                tasks: [
                  {
                    ...curr,
                    id: 0,
                    taskTotalTime: totalTimeOfTask,
                    groupedTasks: [{ ...curr, taskTotalTime: totalTimeOfTask }],
                  },
                ],
              },
            ],
          });

          return acc;
        }

        acc = acc?.map((weekRange) => {
          if (weekRange?.weekName === weekName) {
            const weekTotalTime = weekRange?.weekTotalTime + totalTimeOfTask;

            weekRange = {
              ...weekRange,
              weekTotalTime: weekTotalTime,
              days: groupDays(weekRange?.days, curr, totalTimeOfTask, dayName),
            };
          }

          return weekRange;
        });

        return acc;
      }, []);

    return groupedTasksList;
  }, [tasks]);

  return taskList;
};

const groupDays = (days: TaskWeekDay[], task: TaskI, totalTimeOfTask: number, taskDayName: string) => {
  const isDayAlreadyExist = days?.some((d) => d?.dayName === taskDayName);

  if (!isDayAlreadyExist) {
    days?.push({
      dayName: taskDayName,
      dayTotalTime: totalTimeOfTask,
      tasks: [
        {
          ...task,
          id: 0,
          taskTotalTime: totalTimeOfTask,
          groupedTasks: [{ ...task, taskTotalTime: totalTimeOfTask }],
        },
      ],
    });

    return days;
  }

  days = days?.map((d) => {
    if (d?.dayName === taskDayName) {
      const updatedDayTotalTime = d?.dayTotalTime + totalTimeOfTask;

      return {
        ...d,
        dayTotalTime: updatedDayTotalTime,
        tasks: groupSubTasks(d?.tasks, task, totalTimeOfTask),
      };
    }

    return d;
  });

  return days;
};

const groupSubTasks = (groupedTasks: GroupedTask[], task: TaskI, totalTimeOfTask: number) => {
  const isTaskWithSameDescriptionExist = groupedTasks?.some((t) => t?.description === task?.description);

  if (!isTaskWithSameDescriptionExist) {
    groupedTasks?.push({
      ...task,
      id: 0,
      taskTotalTime: totalTimeOfTask,
      groupedTasks: [{ ...task, taskTotalTime: totalTimeOfTask }],
    });

    return groupedTasks;
  }

  groupedTasks = groupedTasks?.map((t) => {
    if (t?.description === task?.description) {
      t = { ...t, taskTotalTime: t?.taskTotalTime + totalTimeOfTask, startTime: task?.startTime };
      t?.groupedTasks?.push({ ...task, taskTotalTime: totalTimeOfTask });
    }

    return t;
  });

  return groupedTasks;
};
