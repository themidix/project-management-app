import { Router } from "express";
import { register, login } from "./controller/authController";
import { createProject, getProjects, updateProject } from "./controller/projectController";
// import { addTask, updateTask, deleteTask } from "./controller/taskController";
import authMiddleware from "./middlewares/authMiddleware";

const router = Router();

router.post("/auth/register", register);
router.post("/auth/login", login);

router.post("/projects", authMiddleware, createProject);
router.get("/projects", authMiddleware, getProjects);
router.put("/projects/:id", authMiddleware, updateProject);
// router.delete("/projects/:id", authMiddleware, deleteProject);

// Uncomment these routes if you're ready to implement them
// router.post("/projects/:projectId/tasks", authMiddleware, addTask);
// router.put("/tasks/:id", authMiddleware, updateTask);
// router.delete("/tasks/:id", authMiddleware, deleteTask);

export default router;
