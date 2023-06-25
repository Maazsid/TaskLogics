export interface BaseApiResponse<T> {
  status: ResponseStatusEnum;
  data: T;
  messages: Array<string>;
}

enum ResponseStatusEnum {
  Success = 'success',
  Fail = 'fail',
  Error = 'error',
}
