export type GetTaskRes = Array<TaskI>;

export interface TaskI {
  id: number;
  description: string;
  startTime: string;
  endTime: string;
}
