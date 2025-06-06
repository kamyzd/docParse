import Koa from "koa";
import { ENV } from "../utils/env";
export const setupJsonMiddleware = async (app: Koa) => {
  if (process.env.NODE_ENV === ENV.Dev) {
    const { default: json } = await import("koa-json");
    app.use(
      json({
        pretty: true,
        param: "pretty",
        spaces: 2,
      })
    );
  }
};
