import { Context } from "koa";

export enum RequestCode {
  Success = 0,
  Fail = 1,
}
interface ResponseData<T = any> {
  data?: T;
  message?: string;
  metadata?: Record<string, any>;
}

interface SuccessResponse<T = any> {
  code: RequestCode.Success;
  timestamp: number;
  data?: T;
  message?: string;
  metadata?: Record<string, any>;
}

interface ResponseOptions<T = any> extends ResponseData<T> {
  status?: number;
  headers?: Record<string, string>;
}

export const successResponse = <T = any>(
  ctx: Context,
  options: ResponseOptions<T> = {}
) => {
  const {
    data,
    message = "操作成功",
    status = 200,
    headers = {},
    metadata,
  } = options;
  Object.entries(headers).forEach(([key, value]) => {
    ctx.set(key, value);
  });
  const response: SuccessResponse<T> = {
    data,
    message,
    metadata,
    code: RequestCode.Success,
    timestamp: Date.now(),
  };
  ctx.status = status;
  ctx.body = response;
};
