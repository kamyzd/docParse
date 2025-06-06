import Router from "@koa/router";
import { successResponse } from "../util/request";
const router = new Router();

router.get("/", async (ctx) => {
  successResponse(ctx);
});

export default router;
