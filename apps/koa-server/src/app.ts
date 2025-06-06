import Koa from "koa";
import bodyParser from "koa-body";
import Router from "@koa/router";
import { logger, errorHandler } from "./common/middleware";
import { docRoutes } from "./module/doc/routes";
import { setupJsonMiddleware } from "./common/middleware/json";

const app = new Koa();
const rootRooter = new Router();

// 基础中间件
app.use(bodyParser());
app.use(logger);
app.use(errorHandler);
setupJsonMiddleware(app);

rootRooter.use("/doc", docRoutes.routes());
app.use(rootRooter.routes());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
