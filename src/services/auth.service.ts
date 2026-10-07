import bcrypt from "bcrypt";
import { AppError } from "../utils/AppError.js";
import {createToken} from "../utils/jwtToken.js"
import { userModel } from "../models/user.model.js";
import type {ROLEACCESS} from "../generated/prisma/client.js"

const SALT_ROUNDS = 12;

export const authService = {
  async signUp(email: string, password: string, name:string, role: ROLEACCESS ) {
try {
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)

  const result = await userModel.create(email, hashedPassword, name, role)

  if(!result){
  throw new AppError("falied", 400)
  }

const verified =  createToken(result)

return verified

} catch (error) {
  throw new Error("internal server error")
}

  },

  async signIn(email: string, password: string) {
  const user = await userModel.findByEmail(email);

  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    throw new AppError("Invalid email or password", 401);
  }

  return createToken(user);
  },
};
