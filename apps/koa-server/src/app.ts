import Koa from "koa";
import bodyParser from "koa-body";
import Router from "@koa/router";
import { logger, errorHandler } from "./middleware";
import { ENV } from "./util/env";
import docRouter from "./routes/doc";
const app = new Koa();
const setupJsonMiddleware = async () => {
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
const init = async () => {
  app.use(bodyParser());
  app.use(logger);
  app.use(errorHandler);
  await setupJsonMiddleware();
  registerRoute();

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
};

const registerRoute = () => {
  const rootRooter = new Router();
  rootRooter.use("/doc", docRouter.routes(), docRouter.allowedMethods());
  app.use(rootRooter.routes());
};

init().catch((error) => {
  console.error("应用启动失败", error);
  process.exit(1);
});
