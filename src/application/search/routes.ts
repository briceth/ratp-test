import express, { Router } from "express";

import * as action from "./action";

const router: Router = express.Router();

router.get("/search", action.search);

export default router;
