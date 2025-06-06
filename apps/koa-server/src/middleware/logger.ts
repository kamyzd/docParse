import { Context, Next } from "koa";
export const logger = async (ctx: Context, next: Next) => {
  const start = Date.now();
  console.log(`${ctx.method} ${ctx.url}`);
  await next();
  const ms = Date.now() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms, startFrom: ${start}`);
};
