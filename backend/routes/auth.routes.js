import { Router } from "express";
import { loginUser } from "../controllers/logincontroller.js";
import { registerUser } from "../controllers/registercontroller.js";

const router = Router();

router.post("/login", loginUser);
router.post("/register", registerUser);

export default router;
