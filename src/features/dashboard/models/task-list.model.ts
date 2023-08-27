export type TaskListI = Array<TaskListItem>;

export interface TaskListItem {
  weekName: string;
  weekTotalTime: number;
  days: Array<TaskWeekDay>;
}

export interface TaskWeekDay {
  dayName: string;
  dayTotalTime: number;
  tasks: Array<GroupedTask>;
}

export interface GroupedTask extends GroupedTaskItem {
  groupedTasks?: Array<GroupedTaskItem>;
}

export interface GroupedTaskItem {
  id: number;
  description: string;
  startTime: string;
  endTime: string;
  taskTotalTime: number;
}
