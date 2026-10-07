import type { RequestHandler } from "express";
import { authService } from "../services/auth.service.js";
import { sendSuccess } from "../views/apiResponse.view.js";
import * as z from "zod"

const userSchma = z.object({
  name: z.string().min(2, "name must have 2 character"),
  email: z.string().email(),
  password: z.string().min(8, "password must be minimum 8 letters"),
  role: z.enum(['ADMIN', 'SUPER_ADMIN', 'USER'])
})

export const signUp: RequestHandler = async (req, res) => {
  const { email, password, name, role } =  userSchma.parse(req.body)

  const result = await authService.signUp(email, password, name, role);
  sendSuccess(res, result, 201);
};

export const signIn: RequestHandler = async (req, res) => {
  const { email, password } = req.body as { email: string; password: string };
  const result = await authService.signIn(email, password);
  sendSuccess(res, result);
};