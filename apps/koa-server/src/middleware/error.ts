import { Context, Next } from "koa";
import { RequestCode } from "../util/request";
interface AppError extends Error {
  status?: number;
  code?: number;
  details?: unknown;
}
export const errorHandler = async (ctx: Context, next: Next) => {
  try {
    await next();
  } catch (err: unknown) {
    if (err instanceof Error) {
      const error = err as AppError;
      ctx.status = error.status || 500;
      ctx.body = {
        code: error.code || RequestCode.Fail,
        message: error.message || "Internal Server Error",
        details: error.details,
        ...(process.env.NODE_ENV === "development" && { stack: error.stack }),
      };
      ctx.app.emit("error", error, ctx);
    } else {
      ctx.status = 500;
      ctx.body = {
        code: RequestCode.Fail,
        message: "未知错误",
      };
      ctx.app.emit("error", new Error("未知错误"), ctx);
    }
  }
};
