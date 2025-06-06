// src/modules/docx/routes.ts
import Router from "@koa/router";
import { parseDocx } from "./controllers/doc.controller";

const router = new Router();
router.get("/", parseDocx);

export const docRoutes = router;
