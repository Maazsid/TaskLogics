export type GetTaskRes = Array<Task>;

export interface Task {
  id: number;
  description: string;
  startTime: string;
  endTime: string;
}
