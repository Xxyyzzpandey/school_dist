

import express from "express";
import { addSchool, schoolList } from "../controllers/sch.controller.js";

const router = express.Router();

router.post('/addSchool', addSchool);
router.get('/schoolList', schoolList);

export default router;
