import { Router } from "express";
import { signIn, signUp } from "../presenters/auth.presenter.js";
import { validateBody } from "../middleware/validateRequest.js";
import { signInSchema, signUpSchema } from "../validators/auth.validator.js";

export const authRouter = Router();

authRouter.post("/signup", validateBody(signUpSchema), signUp);
authRouter.post("/login", validateBody(signInSchema), signIn);
