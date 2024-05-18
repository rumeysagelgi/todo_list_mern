import express from 'express';
import { addTask, getTask, removeTask, updateTaskStatus, editTask } from '../controllers/taskController.js';
import requireAuth from '../middleware/requireAuth.js';
const router = express.Router();

router.post("/addTask", requireAuth, addTask)
router.get("/getTask", requireAuth, getTask)
router.get("/removeTask", requireAuth, removeTask)
router.post("/updateTaskStatus", requireAuth, updateTaskStatus)
router.post("/editTask/:_id", requireAuth, editTask)

export default router;